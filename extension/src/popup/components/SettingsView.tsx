import React, { useState, useCallback } from 'react';
import type { User, AppSettings, ShareExpiration, ShareUseLimit } from '@/types';
import { setSettings as saveSettings } from '@/lib/storage';
import { auth as authApi, subscription } from '@/lib/api';
import { clearAuth } from '@/lib/auth';
import { expirationToText, useLimitToText } from '@/utils/validators';

interface SettingsViewProps {
  user: User | null;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onLogout: () => void;
  onNeedAuth: () => void;
}

export default function SettingsView({
  user,
  settings,
  onSettingsChange,
  onLogout,
  onNeedAuth,
}: SettingsViewProps) {
  const [loggingOut, setLoggingOut] = useState(false);

  const updateSetting = useCallback(
    async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      const newSettings = { ...settings, [key]: value };
      onSettingsChange(newSettings);
      await saveSettings({ [key]: value });
    },
    [settings, onSettingsChange]
  );

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authApi.logout();
    } catch {
      // Logout anyway
    }
    await clearAuth();
    setLoggingOut(false);
    onLogout();
  };

  const handleUpgrade = async () => {
    try {
      const { url } = await subscription.getCheckoutUrl('pro');
      chrome.tabs.create({ url });
    } catch {
      // Fallback
      chrome.tabs.create({ url: import.meta.env.VITE_APP_URL ? `${import.meta.env.VITE_APP_URL}/pricing` : 'http://localhost:3000/pricing' });
    }
  };

  return (
    <div className="p-4 animate-fade-in space-y-4 max-h-full overflow-y-auto">
      {/* Profile Section */}
      {user ? (
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-surface-400 truncate">{user.email}</p>
            </div>
            <span className={user.tier === 'free' ? 'badge bg-surface-100 dark:bg-surface-700 text-surface-500' : 'badge-pro'}>
              {user.tier.toUpperCase()}
            </span>
          </div>

          {user.tier === 'free' && (
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-surface-500">
                Shares used: {user.sharesUsedThisMonth}/{user.sharesLimit}
              </span>
            </div>
          )}

          {user.tier === 'free' && (
            <button onClick={handleUpgrade} className="btn-primary w-full btn-sm">
              ⚡ Upgrade to Pro
            </button>
          )}
        </div>
      ) : (
        <div className="card">
          <p className="text-xs text-surface-500 mb-2">
            Sign in to sync shares across devices and manage access.
          </p>
          <button onClick={onNeedAuth} className="btn-primary w-full btn-sm">
            Sign In
          </button>
        </div>
      )}

      {/* Theme */}
      <div>
        <h4 className="text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider mb-2">
          Appearance
        </h4>
        <div className="card p-0">
          <div className="flex">
            {(['light', 'dark', 'system'] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => updateSetting('theme', theme)}
                className={`flex-1 py-2.5 text-xs font-medium transition-all first:rounded-l-xl last:rounded-r-xl
                  ${settings.theme === theme
                    ? 'bg-primary-500 text-white'
                    : 'text-surface-500 hover:bg-surface-50 dark:hover:bg-surface-800'
                  }`}
              >
                {theme === 'light' ? '☀️ Light' : theme === 'dark' ? '🌙 Dark' : '💻 System'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Defaults */}
      <div>
        <h4 className="text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider mb-2">
          Defaults
        </h4>
        <div className="card space-y-3">
          <div>
            <label className="label">Default Expiration</label>
            <select
              value={settings.defaultExpiration}
              onChange={(e) => updateSetting('defaultExpiration', e.target.value as ShareExpiration)}
              className="input"
            >
              {(['1h', '6h', '24h', '7d', '30d'] as ShareExpiration[]).map((exp) => (
                <option key={exp} value={exp}>{expirationToText(exp)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Default Use Limit</label>
            <select
              value={settings.defaultUseLimit}
              onChange={(e) => updateSetting('defaultUseLimit', Number(e.target.value) as ShareUseLimit)}
              className="input"
            >
              {([1, 3, 5, 10, -1] as ShareUseLimit[]).map((limit) => (
                <option key={limit} value={limit}>{useLimitToText(limit)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h4 className="text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider mb-2">
          Preferences
        </h4>
        <div className="card space-y-2">
          <ToggleSetting
            label="Auto-detect auth cookies"
            description="Automatically select authentication cookies when exporting"
            checked={settings.autoDetectAuth}
            onChange={(v) => updateSetting('autoDetectAuth', v)}
          />
          <div className="divider" />
          <ToggleSetting
            label="Notifications"
            description="Show notifications when shares are imported"
            checked={settings.notifications}
            onChange={(v) => updateSetting('notifications', v)}
          />
        </div>
      </div>

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="btn-ghost w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          {loggingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      )}

      {/* Version */}
      <p className="text-[10px] text-surface-300 dark:text-surface-600 text-center">
        CookiePass v{chrome.runtime.getManifest().version}
      </p>
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1">
      <div>
        <p className="text-xs font-medium text-surface-800 dark:text-surface-200">{label}</p>
        <p className="text-[10px] text-surface-400">{description}</p>
      </div>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ml-3
          ${checked ? 'bg-primary-500' : 'bg-surface-300 dark:bg-surface-600'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform
            ${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </div>
    </label>
  );
}
