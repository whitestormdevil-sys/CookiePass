"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { Share } from "@/types";

interface ShareDetailsProps {
  shareId: string;
}

export function ShareDetails({ shareId }: ShareDetailsProps) {
  const [share, setShare] = useState<Share | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const response = await api.shares.get(shareId, true);
        
        if (!response.success) {
          throw new Error(response.error || "Failed to fetch share");
        }

        setShare(response.data || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load share");
      } finally {
        setLoading(false);
      }
    };

    fetchShare();
  }, [shareId]);

  const handleRevoke = async () => {
    if (!share || !confirm("Are you sure you want to revoke this share? This action cannot be undone.")) {
      return;
    }

    setRevoking(true);
    try {
      const response = await api.shares.revoke(shareId);
      
      if (!response.success) {
        alert(`Failed to revoke share: ${response.error}`);
        return;
      }

      setShare({
        ...share,
        status: "revoked",
        isRevoked: true,
        revokedAt: new Date().toISOString(),
      });
      alert("Share revoked successfully!");
    } catch (err) {
      alert(`Error revoking share: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setRevoking(false);
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/s/${shareId}`;
    try {
      await navigator.clipboard.writeText(url);
      // Could show a toast notification here
      alert("Share link copied to clipboard!");
    } catch (err) {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Share link copied to clipboard!");
    }
  };

  const getTimeUntilExpiry = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h left`;
    return `${hours}h left`;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "success" as const;
      case "expired": return "warning" as const;
      case "revoked": return "danger" as const;
      default: return "default" as const;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} padding="sm">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !share) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">
              <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400">{error || "Share not found"}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Share Details
          </h2>
          <p className="text-sm text-gray-500">ID: {shareId}</p>
        </div>
        <Badge variant={getStatusVariant(share.status)}>
          {share.status.charAt(0).toUpperCase() + share.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Domain</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {share.domain}
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Cookies</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {share.cookies}
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Imports</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {share.currentUses} / {share.maxUses}
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Expires</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {getTimeUntilExpiry(share.expiresAt)}
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Share Link
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
            {window.location.origin}/s/{shareId}
          </div>
          <Button variant="secondary" size="sm" onClick={handleCopyLink}>
            Copy
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Created
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(share.createdAt).toLocaleString()}
          </p>
        </Card>
        
        {share.revokedAt && (
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Revoked
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(share.revokedAt).toLocaleString()}
            </p>
          </Card>
        )}
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Actions
        </h3>
        <div className="flex gap-3">
          {share.status === "active" && (
            <Button 
              variant="danger" 
              onClick={handleRevoke}
              loading={revoking}
            >
              {revoking ? "Revoking..." : "Revoke Share"}
            </Button>
          )}
          <Button variant="outline" disabled>
            Extend Expiry (Coming Soon)
          </Button>
        </div>
      </Card>
    </div>
  );
}
