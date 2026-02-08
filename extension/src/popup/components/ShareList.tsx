import React, { useState, useEffect, useCallback } from 'react';
import type { User, Share, ShareStatus } from '@/types';
import { shares as sharesApi } from '@/lib/api';
import { relativeTime } from '@/utils/validators';

interface ShareListProps {
  user: User | null;
  onNeedAuth: () => void;
}

type FilterStatus = 'all' | 'active' | 'expired' | 'revoked';

export default function ShareList({ user, onNeedAuth }: ShareListProps) {
  const [shareList, setShareList] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    loadShares();
  }, [user]);

  const loadShares = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sharesApi.list();
      setShareList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load shares');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRevoke = useCallback(async (shareId: string) => {
    setRevoking(shareId);
    try {
      await sharesApi.revoke(shareId);
      setShareList(prev =>
        prev.map(s => s.id === shareId ? { ...s, status: 'revoked' as ShareStatus } : s)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke share');
    } finally {
      setRevoking(null);
    }
  }, []);

  const filteredShares = shareList.filter(s =>
    filter === 'all' ? true : s.status === filter
  );

  if (!user) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-surface-400">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">Sign in to view shares</h3>
        <p className="text-xs text-surface-500 text-center mb-3">
          Create an account to track your shares and manage access.
        </p>
        <button onClick={onNeedAuth} className="btn-primary">
          Sign In
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white">My Shares</h3>
        <button onClick={loadShares} className="btn-ghost btn-sm" title="Refresh">
          ↻
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-3">
        {(['all', 'active', 'expired', 'revoked'] as FilterStatus[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-full transition-all
              ${filter === f
                ? 'bg-primary-500 text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-3">
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {filteredShares.length === 0 ? (
        <div className="flex flex-col items-center py-8">
          <p className="text-xs text-surface-500">
            {filter === 'all' ? 'No shares yet. Create one from the Export tab!' : `No ${filter} shares.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {filteredShares.map((share) => (
            <ShareCard
              key={share.id}
              share={share}
              onRevoke={() => handleRevoke(share.id)}
              revoking={revoking === share.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ShareCard({
  share,
  onRevoke,
  revoking,
}: {
  share: Share;
  onRevoke: () => void;
  revoking: boolean;
}) {
  const statusBadge = {
    active: 'badge-active',
    expired: 'badge-expired',
    revoked: 'badge-revoked',
    exhausted: 'badge-expired',
  }[share.status];

  return (
    <div className="card p-3 animate-slide-up">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-surface-900 dark:text-white truncate">
              {share.domain}
            </span>
            <span className={statusBadge}>
              {share.status}
            </span>
          </div>
          <p className="text-[10px] text-surface-400 mt-0.5">
            {share.cookieCount} cookies • Created {relativeTime(share.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-surface-400">
        <span>
          {share.useCount}/{share.useLimit === -1 ? '∞' : share.useLimit} uses
        </span>
        <span>
          {share.status === 'active'
            ? `Expires ${relativeTime(share.expiresAt)}`
            : share.status === 'expired'
            ? 'Expired'
            : share.status === 'revoked'
            ? 'Revoked'
            : 'Used up'
          }
        </span>
      </div>

      {share.status === 'active' && (
        <div className="mt-2 pt-2 border-t border-surface-100 dark:border-surface-700">
          <button
            onClick={onRevoke}
            disabled={revoking}
            className="btn-danger btn-sm w-full"
          >
            {revoking ? 'Revoking...' : 'Revoke Access'}
          </button>
        </div>
      )}
    </div>
  );
}
