import React from 'react';
import type { TabInfo, User } from '@/types';

interface HeaderProps {
  tabInfo: TabInfo | null;
  user: User | null;
  onProfileClick: () => void;
}

export default function Header({ tabInfo, user, onProfileClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-surface-900 dark:text-white leading-none">
            CookiePass
          </h1>
          {tabInfo && (
            <p className="text-[10px] text-surface-400 dark:text-surface-500 truncate max-w-[180px] mt-0.5">
              {tabInfo.domain}
            </p>
          )}
        </div>
      </div>

      {/* Profile */}
      <button
        onClick={onProfileClick}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
      >
        {user ? (
          <>
            <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </span>
            </div>
            {user.tier !== 'free' && (
              <span className="badge-pro text-[10px]">PRO</span>
            )}
          </>
        ) : (
          <span className="text-xs text-primary-500 font-medium">Sign in</span>
        )}
      </button>
    </div>
  );
}
