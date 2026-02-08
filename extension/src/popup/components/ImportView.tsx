import React, { useState, useCallback } from 'react';
import type { User, CookieData } from '@/types';
import { parseShareLink } from '@/utils/validators';
import { shares as sharesApi } from '@/lib/api';
import { decrypt } from '@/lib/crypto';
import { addImportHistory } from '@/lib/storage';
import { hasPermission, requestPermission } from '@/lib/permissions';

interface ImportViewProps {
  user: User | null;
  onNeedAuth: () => void;
}

type ImportStep = 'input' | 'preview' | 'importing' | 'result';

interface ImportPreview {
  domain: string;
  cookieCount: number;
  includesStorage: boolean;
  expiresAt: string;
  shareId: string;
}

export default function ImportView({ user, onNeedAuth }: ImportViewProps) {
  const [step, setStep] = useState<ImportStep>('input');
  const [shareLink, setShareLink] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [importResult, setImportResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);

  const handleFetchShare = useCallback(async () => {
    setError(null);

    const parsed = parseShareLink(shareLink);
    if (!parsed) {
      setError('Invalid share link. Please check and try again.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter the share password.');
      return;
    }

    setLoading(true);

    try {
      const data = await sharesApi.getImportData(parsed.shortCode);

      if (data.status === 'revoked') {
        setError('This share has been revoked by the owner.');
        return;
      }
      if (data.status === 'expired') {
        setError('This share has expired.');
        return;
      }
      if (data.status === 'exhausted') {
        setError('This share has reached its use limit.');
        return;
      }

      setPreview({
        domain: data.domain,
        cookieCount: data.cookieCount,
        includesStorage: data.includesStorage,
        expiresAt: data.expiresAt,
        shareId: data.id,
      });
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch share');
    } finally {
      setLoading(false);
    }
  }, [shareLink, password]);

  const handleImport = useCallback(async () => {
    if (!preview) return;
    setError(null);

    // Request host permission FIRST (while still in user gesture context)
    const targetUrl = `https://${preview.domain}`;
    const alreadyHasPermission = await hasPermission(targetUrl);
    if (!alreadyHasPermission) {
      const granted = await requestPermission(targetUrl);
      if (!granted) {
        setError(
          `Permission denied for ${preview.domain}. CookiePass needs access to set cookies on this site.`
        );
        return;
      }
    }

    setStep('importing');

    try {
      // Fetch encrypted data
      const parsed = parseShareLink(shareLink)!;
      const data = await sharesApi.getImportData(parsed.shortCode);

      // Decrypt
      const decrypted = await decrypt(
        {
          ciphertext: data.encryptedData,
          salt: data.salt,
          iv: data.iv,
        },
        password
      );

      // Set cookies via background
      const response = await new Promise<{
        success: boolean;
        data?: { success: number; failed: number; errors: string[] };
        error?: string;
      }>((resolve) => {
        chrome.runtime.sendMessage(
          {
            type: 'SET_COOKIES',
            payload: { cookies: decrypted.cookies, domain: decrypted.domain },
          },
          resolve
        );
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to set cookies');
      }

      // Open the target site FIRST (needed for localStorage/sessionStorage injection)
      const openTargetUrl = `https://${preview.domain}`;
      if (decrypted.localStorage || decrypted.sessionStorage) {
        // Open tab and wait for it to load before injecting storage
        await new Promise<void>((resolve) => {
          chrome.runtime.sendMessage(
            { type: 'OPEN_TAB', payload: { url: openTargetUrl } },
            () => {
              // Give the page a moment to load
              setTimeout(resolve, 2000);
            }
          );
        });

        // Set localStorage if included
        if (decrypted.localStorage) {
          await new Promise<void>((resolve) => {
            chrome.runtime.sendMessage(
              { type: 'SET_LOCAL_STORAGE', payload: { data: decrypted.localStorage } },
              () => resolve()
            );
          });
        }

        // Set sessionStorage if included
        if (decrypted.sessionStorage) {
          await new Promise<void>((resolve) => {
            chrome.runtime.sendMessage(
              { type: 'SET_SESSION_STORAGE', payload: { data: decrypted.sessionStorage } },
              () => resolve()
            );
          });
        }
      }

      // Record import
      try {
        await sharesApi.recordImport(preview.shareId);
      } catch {
        // Non-critical
      }

      // Save to local import history
      await addImportHistory({
        shareId: preview.shareId,
        domain: preview.domain,
        importedAt: new Date().toISOString(),
        cookieCount: decrypted.cookies.length,
      });

      setImportResult(response.data || { success: decrypted.cookies.length, failed: 0, errors: [] });
      setStep('result');

      // Open the target site (if we haven't already for storage)
      if (!decrypted.localStorage && !decrypted.sessionStorage) {
        chrome.runtime.sendMessage({ type: 'OPEN_TAB', payload: { url: openTargetUrl } });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Import failed. Please check your password and try again.'
      );
      setStep('preview');
    }
  }, [preview, shareLink, password]);

  const reset = () => {
    setStep('input');
    setShareLink('');
    setPassword('');
    setError(null);
    setPreview(null);
    setImportResult(null);
  };

  // --- Result ---
  if (step === 'result' && importResult) {
    const allSuccess = importResult.failed === 0;
    return (
      <div className="p-4 animate-fade-in">
        <div className="flex flex-col items-center py-6">
          <div className={`w-12 h-12 ${allSuccess ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'} rounded-full flex items-center justify-center mb-3`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={allSuccess ? 'text-green-500' : 'text-amber-500'}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">
            {allSuccess ? 'Import Successful!' : 'Import Partially Successful'}
          </h3>
          <p className="text-xs text-surface-500 text-center">
            {importResult.success}/{importResult.success + importResult.failed} cookies imported for {preview?.domain}
          </p>
          {importResult.failed > 0 && (
            <div className="mt-2 w-full">
              <p className="text-xs text-amber-500 text-center mb-1">
                {importResult.failed} cookie{importResult.failed > 1 ? 's' : ''} could not be set:
              </p>
              <div className="max-h-24 overflow-y-auto bg-surface-50 dark:bg-surface-800 rounded-lg p-2">
                {importResult.errors.map((err, i) => (
                  <p key={i} className="text-[10px] text-surface-500 font-mono truncate">{err}</p>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-surface-400 mt-3">
            The target site has been opened in a new tab.
          </p>
          <button onClick={reset} className="btn-secondary mt-4">
            Import Another
          </button>
        </div>
      </div>
    );
  }

  // --- Importing ---
  if (step === 'importing') {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium text-surface-900 dark:text-white">Importing cookies...</p>
        <p className="text-xs text-surface-500 mt-1">Decrypting and setting cookies</p>
      </div>
    );
  }

  // --- Preview ---
  if (step === 'preview' && preview) {
    return (
      <div className="p-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep('input')} className="btn-ghost btn-sm p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Confirm Import</h3>
        </div>

        <div className="card space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-500">Domain</span>
            <span className="text-xs font-medium text-surface-900 dark:text-white">{preview.domain}</span>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-500">Cookies</span>
            <span className="text-xs font-medium">{preview.cookieCount}</span>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-500">Includes Storage</span>
            <span className="text-xs font-medium">{preview.includesStorage ? 'Yes' : 'No'}</span>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-500">Expires</span>
            <span className="text-xs font-medium">{new Date(preview.expiresAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            ⚠️ This will set cookies in your browser for <strong>{preview.domain}</strong>.
            Only import shares from people you trust.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => setStep('input')} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={handleImport} className="btn-primary flex-1">
            Import Cookies
          </button>
        </div>
      </div>
    );
  }

  // --- Input (default) ---
  return (
    <div className="p-4 animate-fade-in">
      <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">
        Import a Share
      </h3>
      <p className="text-xs text-surface-500 mb-4">
        Paste the share link and password you received.
      </p>

      <div className="space-y-3">
        <div>
          <label className="label">Share Link</label>
          <input
            type="text"
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
            className="input"
            placeholder="http://localhost:3000/s/xxxxx or short code"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input font-mono"
            placeholder="autumn-tiger-92"
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          onClick={handleFetchShare}
          disabled={loading || !shareLink.trim() || !password.trim()}
          className="btn-primary w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Fetching...
            </span>
          ) : (
            'Import Share'
          )}
        </button>
      </div>
    </div>
  );
}
