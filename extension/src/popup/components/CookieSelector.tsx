import React from 'react';
import type { AnalyzedCookie } from '@/types';

interface CookieSelectorProps {
  cookies: AnalyzedCookie[];
  onToggle: (index: number) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  session: '🔐',
  jwt: '🎫',
  oauth: '🔗',
  csrf: '🛡️',
  persistent_auth: '📌',
  authentication: '🔑',
  tracking: '📊',
  preference: '⚙️',
  analytics: '📈',
  functional: '🍪',
  unknown: '❓',
};

export default function CookieSelector({ cookies, onToggle }: CookieSelectorProps) {
  // Group cookies: auth first, then others
  const authCookies = cookies
    .map((c, i) => ({ ...c, originalIndex: i }))
    .filter(c => c.classification === 'authentication')
    .sort((a, b) => b.confidence - a.confidence);

  const otherCookies = cookies
    .map((c, i) => ({ ...c, originalIndex: i }))
    .filter(c => c.classification !== 'authentication');

  return (
    <div className="max-h-[250px] overflow-y-auto space-y-1 pr-1">
      {/* Auth cookies section */}
      {authCookies.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-500">
              Authentication ({authCookies.length})
            </span>
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
          </div>
          {authCookies.map((cookie) => (
            <CookieRow
              key={`${cookie.name}-${cookie.domain}`}
              cookie={cookie}
              onToggle={() => onToggle(cookie.originalIndex)}
            />
          ))}
        </div>
      )}

      {/* Other cookies section */}
      {otherCookies.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
              Other ({otherCookies.length})
            </span>
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
          </div>
          {otherCookies.map((cookie) => (
            <CookieRow
              key={`${cookie.name}-${cookie.domain}`}
              cookie={cookie}
              onToggle={() => onToggle(cookie.originalIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CookieRow({
  cookie,
  onToggle,
}: {
  cookie: AnalyzedCookie & { originalIndex: number };
  onToggle: () => void;
}) {
  const icon = CATEGORY_ICONS[cookie.category] || '🍪';

  return (
    <label
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors
        ${cookie.selected
          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
          : 'hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent'
        }`}
    >
      <input
        type="checkbox"
        checked={cookie.selected}
        onChange={onToggle}
        className="w-3.5 h-3.5 rounded border-surface-300 text-primary-500 focus:ring-primary-500 flex-shrink-0"
      />
      <span className="text-xs flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-surface-800 dark:text-surface-200 truncate">
            {cookie.name}
          </span>
          {cookie.httpOnly && (
            <span className="text-[8px] px-1 py-0 bg-surface-100 dark:bg-surface-700 text-surface-500 rounded">
              HttpOnly
            </span>
          )}
          {cookie.secure && (
            <span className="text-[8px] px-1 py-0 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
              Secure
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] text-surface-400 truncate max-w-[150px]">
            {cookie.domain}
          </span>
          {cookie.classification === 'authentication' && (
            <span className="text-[9px] text-primary-500 font-medium">
              {Math.round(cookie.confidence * 100)}%
            </span>
          )}
        </div>
      </div>
    </label>
  );
}
