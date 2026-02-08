// ============================================================================
// CookiePass Chrome Storage Wrapper
// ============================================================================

import type { AppSettings, DEFAULT_SETTINGS } from '@/types';

type StorageArea = 'local' | 'sync';

/**
 * Generic get from chrome.storage
 */
export async function get<T>(key: string, area: StorageArea = 'local'): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage[area].get(key, (result) => {
      resolve(result[key] as T | undefined);
    });
  });
}

/**
 * Generic set to chrome.storage
 */
export async function set<T>(key: string, value: T, area: StorageArea = 'local'): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage[area].set({ [key]: value }, resolve);
  });
}

/**
 * Remove a key from chrome.storage
 */
export async function remove(key: string, area: StorageArea = 'local'): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage[area].remove(key, resolve);
  });
}

/**
 * Clear all data from a storage area
 */
export async function clear(area: StorageArea = 'local'): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage[area].clear(resolve);
  });
}

// --- Typed Helpers ---

const KEYS = {
  SETTINGS: 'cookiepass_settings',
  AUTH_TOKENS: 'cookiepass_auth_tokens',
  USER: 'cookiepass_user',
  ONBOARDING_COMPLETE: 'cookiepass_onboarding_complete',
  IMPORT_HISTORY: 'cookiepass_import_history',
  SHARE_DRAFTS: 'cookiepass_share_drafts',
} as const;

export { KEYS };

export async function getSettings(): Promise<AppSettings> {
  const settings = await get<AppSettings>(KEYS.SETTINGS, 'sync');
  return settings || {
    theme: 'system',
    autoDetectAuth: true,
    showOnboarding: true,
    defaultExpiration: '24h',
    defaultUseLimit: 1,
    notifications: true,
  };
}

export async function setSettings(settings: Partial<AppSettings>): Promise<void> {
  const current = await getSettings();
  await set(KEYS.SETTINGS, { ...current, ...settings }, 'sync');
}

export async function isOnboardingComplete(): Promise<boolean> {
  return (await get<boolean>(KEYS.ONBOARDING_COMPLETE)) ?? false;
}

export async function setOnboardingComplete(): Promise<void> {
  await set(KEYS.ONBOARDING_COMPLETE, true);
}

export interface ImportHistoryEntry {
  shareId: string;
  domain: string;
  importedAt: string;
  cookieCount: number;
}

export async function getImportHistory(): Promise<ImportHistoryEntry[]> {
  return (await get<ImportHistoryEntry[]>(KEYS.IMPORT_HISTORY)) ?? [];
}

export async function addImportHistory(entry: ImportHistoryEntry): Promise<void> {
  const history = await getImportHistory();
  history.unshift(entry);
  // Keep only last 50 entries
  if (history.length > 50) history.length = 50;
  await set(KEYS.IMPORT_HISTORY, history);
}

export default { get, set, remove, clear, KEYS, getSettings, setSettings };
