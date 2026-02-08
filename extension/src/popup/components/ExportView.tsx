import React, { useState, useEffect, useCallback } from 'react';
import type { TabInfo, User, AppSettings, AnalyzedCookie, CookieData, ShareExpiration, ShareUseLimit } from '@/types';
import { analyzeCookies } from '@/utils/cookie-analyzer';
import { checkDomain } from '@/utils/domain-blocklist';
import { generatePassword, validatePassword } from '@/utils/password-generator';
import { encrypt, createPayload } from '@/lib/crypto';
import { shares as sharesApi } from '@/lib/api';
import { expirationToText, useLimitToText } from '@/utils/validators';
import { hasPermission, requestPermission, canHavePermissions } from '@/lib/permissions';
import CookieSelector from './CookieSelector';

interface ExportViewProps {
  tabInfo: TabInfo | null;
  user: User | null;
  settings: AppSettings | null;
  onNeedAuth: () => void;
}

type ExportStep = 'select' | 'configure' | 'result';

export default function ExportView({ tabInfo, user, settings, onNeedAuth }: ExportViewProps) {
  const [step, setStep] = useState<ExportStep>('select');
  const [cookies, setCookies] = useState<AnalyzedCookie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState<{ isBlocked: boolean; reason?: string }>({ isBlocked: false });
  const [needsPermission, setNeedsPermission] = useState(false);
  const [requestingPermission, setRequestingPermission] = useState(false);

  // Config
  const [expiration, setExpiration] = useState<ShareExpiration>(settings?.defaultExpiration || '24h');
  const [useLimit, setUseLimit] = useState<ShareUseLimit>(settings?.defaultUseLimit || 1);
  const [password, setPassword] = useState('');
  const [customPassword, setCustomPassword] = useState(false);
  const [includeStorage, setIncludeStorage] = useState(false);

  // Result
  const [shareUrl, setShareUrl] = useState('');
  const [sharePassword, setSharePassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<'link' | 'password' | null>(null);

  // Load cookies for current tab — with permission check
  const loadCookies = useCallback(() => {
    if (!tabInfo?.url) {
      setLoading(false);
      return;
    }

    chrome.runtime.sendMessage(
      { type: 'GET_COOKIES', payload: { url: tabInfo.url } },
      (response) => {
        if (response?.success && response.data) {
          const analyzed = analyzeCookies(response.data as CookieData[]);
          setCookies(analyzed);
          setNeedsPermission(false);
        } else {
          setError('Could not load cookies for this site.');
        }
        setLoading(false);
      }
    );
  }, [tabInfo]);

  useEffect(() => {
    if (!tabInfo?.url) {
      setLoading(false);
      return;
    }

    // Check domain blocklist
    const blockCheck = checkDomain(tabInfo.domain);
    if (blockCheck.isBlocked) {
      setBlocked(blockCheck);
      setLoading(false);
      return;
    }

    // Check if we can access this URL at all
    if (!canHavePermissions(tabInfo.url)) {
      setError('Cannot access cookies for this type of page.');
      setLoading(false);
      return;
    }

    // Check permission first, then load cookies
    hasPermission(tabInfo.url).then((granted) => {
      if (granted) {
        loadCookies();
      } else {
        // Try loading anyway — chrome.cookies.getAll with "cookies" permission
        // works for some cases even without host permissions
        chrome.runtime.sendMessage(
          { type: 'GET_COOKIES', payload: { url: tabInfo.url } },
          (response) => {
            if (response?.success && response.data && (response.data as CookieData[]).length > 0) {
              const analyzed = analyzeCookies(response.data as CookieData[]);
              setCookies(analyzed);
              setLoading(false);
            } else {
              // No cookies found — likely need permission
              setNeedsPermission(true);
              setLoading(false);
            }
          }
        );
      }
    });

    // Generate initial password
    setPassword(generatePassword());
  }, [tabInfo, loadCookies]);

  const handleGrantAccess = async () => {
    if (!tabInfo?.url) return;
    setRequestingPermission(true);
    const granted = await requestPermission(tabInfo.url);
    if (granted) {
      setNeedsPermission(false);
      setLoading(true);
      loadCookies();
    }
    setRequestingPermission(false);
  };

  const selectedCookies = cookies.filter(c => c.selected);
  const isPro = user?.tier === 'pro' || user?.tier === 'team';

  const toggleCookie = useCallback((index: number) => {
    setCookies(prev => prev.map((c, i) =>
      i === index ? { ...c, selected: !c.selected } : c
    ));
  }, []);

  const selectAll = useCallback(() => {
    setCookies(prev => prev.map(c => ({ ...c, selected: true })));
  }, []);

  const selectNone = useCallback(() => {
    setCookies(prev => prev.map(c => ({ ...c, selected: false })));
  }, []);

  const selectAuth = useCallback(() => {
    setCookies(prev =>
      prev.map(c => ({
        ...c,
        selected: c.classification === 'authentication',
      }))
    );
  }, []);

  const handleCreateShare = async () => {
    if (!user) {
      onNeedAuth();
      return;
    }

    if (selectedCookies.length === 0) {
      setError('Please select at least one cookie to share.');
      return;
    }

    const pwd = customPassword ? password : password;
    const validation = validatePassword(pwd);
    if (!validation.valid) {
      setError(validation.reason || 'Invalid password');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      // Build payload
      let localStorageData: Record<string, string> | undefined;
      let sessionStorageData: Record<string, string> | undefined;

      if (includeStorage && isPro) {
        // Get localStorage via background
        const lsResponse = await new Promise<{ success: boolean; data?: Record<string, string> }>((resolve) => {
          chrome.runtime.sendMessage({ type: 'GET_LOCAL_STORAGE' }, resolve);
        });
        if (lsResponse.success) localStorageData = lsResponse.data;

        const ssResponse = await new Promise<{ success: boolean; data?: Record<string, string> }>((resolve) => {
          chrome.runtime.sendMessage({ type: 'GET_SESSION_STORAGE' }, resolve);
        });
        if (ssResponse.success) sessionStorageData = ssResponse.data;
      }

      const payload = createPayload(
        selectedCookies.map(c => ({
          name: c.name,
          value: c.value,
          domain: c.domain,
          path: c.path,
          secure: c.secure,
          httpOnly: c.httpOnly,
          sameSite: c.sameSite,
          expirationDate: c.expirationDate,
          hostOnly: c.hostOnly,
        })),
        tabInfo!.domain,
        localStorageData,
        sessionStorageData
      );

      // Encrypt
      const encrypted = await encrypt(payload, pwd);

      // Create share via API
      const result = await sharesApi.create(encrypted, {
        domain: tabInfo!.domain,
        expiration,
        useLimit,
        cookieCount: selectedCookies.length,
        localStorage: localStorageData,
        sessionStorage: sessionStorageData,
      });

      setShareUrl(result.shareUrl);
      setSharePassword(pwd);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create share');
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = async (text: string, type: 'link' | 'password') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // --- Blocked domain ---
  if (blocked.isBlocked) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">Domain Blocked</h3>
        <p className="text-xs text-surface-500 text-center max-w-[280px]">
          {blocked.reason || 'This domain is blocked for security reasons.'}
        </p>
      </div>
    );
  }

  // --- No tab ---
  if (!tabInfo?.url) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p className="text-xs text-surface-500 text-center">
          Navigate to a website to export cookies.
        </p>
      </div>
    );
  }

  // --- Loading ---
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- Result step ---
  if (step === 'result') {
    return (
      <div className="p-4 animate-fade-in">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Share Created!</h3>
          <p className="text-xs text-surface-500 mt-1">Send the link and password separately for best security.</p>
        </div>

        <div className="space-y-3">
          {/* Share Link */}
          <div>
            <label className="label">Share Link</label>
            <div className="flex gap-2">
              <input type="text" readOnly value={shareUrl} className="input text-xs font-mono" />
              <button
                onClick={() => handleCopy(shareUrl, 'link')}
                className="btn-secondary btn-sm whitespace-nowrap"
              >
                {copied === 'link' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="flex gap-2">
              <input type="text" readOnly value={sharePassword} className="input text-xs font-mono" />
              <button
                onClick={() => handleCopy(sharePassword, 'password')}
                className="btn-secondary btn-sm whitespace-nowrap"
              >
                {copied === 'password' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Security tip */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              💡 <strong>Security tip:</strong> Send the link and password via different channels
              (e.g., link via Slack, password via SMS).
            </p>
          </div>

          <button
            onClick={() => {
              setStep('select');
              setShareUrl('');
              setSharePassword('');
              setPassword(generatePassword());
            }}
            className="btn-secondary w-full"
          >
            Create Another Share
          </button>
        </div>
      </div>
    );
  }

  // --- Configure step ---
  if (step === 'configure') {
    return (
      <div className="p-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep('select')} className="btn-ghost btn-sm p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
            Configure Share
          </h3>
          <span className="text-xs text-surface-400 ml-auto">
            {selectedCookies.length} cookies selected
          </span>
        </div>

        <div className="space-y-4">
          {/* Expiration */}
          <div>
            <label className="label">Expiration</label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['1h', '6h', '24h', '7d', '30d'] as ShareExpiration[]).map((exp) => {
                const isProOnly = exp === '30d' && !isPro;
                return (
                  <button
                    key={exp}
                    onClick={() => !isProOnly && setExpiration(exp)}
                    disabled={isProOnly}
                    className={`py-1.5 text-xs rounded-lg border transition-all relative
                      ${expiration === exp
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300 dark:hover:border-surface-600'
                      }
                      ${isProOnly ? 'opacity-50' : ''}`}
                  >
                    {expirationToText(exp)}
                    {isProOnly && <span className="absolute -top-1 -right-1 text-[8px] badge-pro px-1">PRO</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Use Limit */}
          <div>
            <label className="label">Use Limit</label>
            <div className="grid grid-cols-5 gap-1.5">
              {([1, 3, 5, 10, -1] as ShareUseLimit[]).map((limit) => {
                const isProOnly = (limit === 10 || limit === -1) && !isPro;
                return (
                  <button
                    key={limit}
                    onClick={() => !isProOnly && setUseLimit(limit)}
                    disabled={isProOnly}
                    className={`py-1.5 text-xs rounded-lg border transition-all relative
                      ${useLimit === limit
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300 dark:hover:border-surface-600'
                      }
                      ${isProOnly ? 'opacity-50' : ''}`}
                  >
                    {useLimitToText(limit)}
                    {isProOnly && <span className="absolute -top-1 -right-1 text-[8px] badge-pro px-1">PRO</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label mb-0">Password</label>
              <button
                onClick={() => {
                  setCustomPassword(!customPassword);
                  if (customPassword) setPassword(generatePassword());
                }}
                className="text-[10px] text-primary-500 hover:text-primary-600"
              >
                {customPassword ? 'Auto-generate' : 'Custom password'}
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={!customPassword}
                className="input text-xs font-mono"
                placeholder="Enter password..."
              />
              {!customPassword && (
                <button
                  onClick={() => setPassword(generatePassword())}
                  className="btn-secondary btn-sm"
                  title="Regenerate"
                >
                  ↻
                </button>
              )}
            </div>
          </div>

          {/* Include Storage (Pro) */}
          {isPro && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeStorage}
                onChange={(e) => setIncludeStorage(e.target.checked)}
                className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-xs text-surface-600 dark:text-surface-400">
                Include localStorage & sessionStorage
              </span>
              <span className="badge-pro text-[10px]">PRO</span>
            </label>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={handleCreateShare}
            disabled={creating || selectedCookies.length === 0}
            className="btn-primary w-full"
          >
            {creating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </span>
            ) : (
              `Create Share (${selectedCookies.length} cookies)`
            )}
          </button>
        </div>
      </div>
    );
  }

  // --- Select step (default) ---
  return (
    <div className="p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
          Cookies for {tabInfo.domain}
        </h3>
        <span className="text-xs text-surface-400">{cookies.length} total</span>
      </div>

      {needsPermission ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">Permission Required</h3>
          <p className="text-xs text-surface-500 text-center max-w-[280px] mb-4">
            CookiePass needs access to <strong>{tabInfo.domain}</strong> to read its cookies. 
            Click below to grant access.
          </p>
          <button
            onClick={handleGrantAccess}
            disabled={requestingPermission}
            className="btn-primary"
          >
            {requestingPermission ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Requesting...
              </span>
            ) : (
              '🔓 Grant Access to ' + tabInfo.domain
            )}
          </button>
        </div>
      ) : cookies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-xs text-surface-500">No cookies found for this site.</p>
        </div>
      ) : (
        <>
          {/* Quick actions */}
          <div className="flex gap-2 mb-3">
            <button onClick={selectAuth} className="btn-secondary btn-sm">🔑 Auth Only</button>
            <button onClick={selectAll} className="btn-secondary btn-sm">Select All</button>
            <button onClick={selectNone} className="btn-secondary btn-sm">Clear</button>
          </div>

          <CookieSelector cookies={cookies} onToggle={toggleCookie} />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 mt-3">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={() => {
              if (selectedCookies.length === 0) {
                setError('Please select at least one cookie.');
                return;
              }
              setError(null);
              setStep('configure');
            }}
            disabled={selectedCookies.length === 0}
            className="btn-primary w-full mt-3"
          >
            Continue with {selectedCookies.length} cookies →
          </button>
        </>
      )}
    </div>
  );
}
