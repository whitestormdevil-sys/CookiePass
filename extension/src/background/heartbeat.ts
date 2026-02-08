// ============================================================================
// CookiePass Background Service Worker — Heartbeat / Revocation Checks
// ============================================================================

import { getAuthTokens } from '@/lib/auth';

const ALARM_NAME = 'cookiepass-heartbeat';
const HEARTBEAT_INTERVAL_MINUTES = 5;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Setup the heartbeat alarm for periodic revocation checks.
 */
export function setupHeartbeat(): void {
  chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: HEARTBEAT_INTERVAL_MINUTES,
  });
}

/**
 * Handle heartbeat alarm — check for revoked shares.
 */
export async function handleHeartbeat(): Promise<void> {
  try {
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) return;

    // Check for any revocation notifications
    const response = await fetch(`${API_BASE_URL}/notifications/pending`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return;

    const notifications = await response.json();

    if (Array.isArray(notifications) && notifications.length > 0) {
      for (const notification of notifications) {
        if (notification.type === 'share_imported') {
          // Show notification that someone imported your share
          chrome.notifications.create({
            type: 'basic',
            iconUrl: chrome.runtime.getURL('icons/icon-128.png'),
            title: 'CookiePass — Share Imported',
            message: `Someone imported your share for ${notification.domain}`,
          });
        }
      }
    }
  } catch (error) {
    // Silently fail — heartbeat is best-effort
    console.debug('Heartbeat check failed:', error);
  }
}

/**
 * Cleanup the heartbeat alarm.
 */
export function clearHeartbeat(): void {
  chrome.alarms.clear(ALARM_NAME);
}
