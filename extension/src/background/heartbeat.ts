// ============================================================================
// CookiePass Background Service Worker — Heartbeat / Import Notifications
// ============================================================================

import { getAuthTokens } from '@/lib/auth';

const ALARM_NAME = 'cookiepass-heartbeat';
const HEARTBEAT_INTERVAL_MINUTES = 5;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Store last checked import timestamps to detect new ones
let lastImportCheck: Record<string, number> = {};

/**
 * Setup the heartbeat alarm for periodic import checks.
 */
export function setupHeartbeat(): void {
  chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: HEARTBEAT_INTERVAL_MINUTES,
  });
}

/**
 * Handle heartbeat alarm — check for new imports on user's shares.
 */
export async function handleHeartbeat(): Promise<void> {
  try {
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) return;

    // Get user's active shares
    const sharesResponse = await fetch(`${API_BASE_URL}/shares?status=active`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!sharesResponse.ok) return;

    const sharesData = await sharesResponse.json();
    const shares = sharesData.data || [];

    // Check imports for each share
    for (const share of shares) {
      try {
        const importsResponse = await fetch(`${API_BASE_URL}/shares/${share.id}/imports?limit=1`, {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!importsResponse.ok) continue;

        const importsData = await importsResponse.json();
        const latestImports = importsData.data || [];

        if (latestImports.length > 0) {
          const latestImport = latestImports[0];
          const importTime = new Date(latestImport.imported_at).getTime();
          const lastChecked = lastImportCheck[share.id] || 0;

          // If this is a new import since our last check
          if (importTime > lastChecked) {
            // Show notification
            chrome.notifications.create({
              type: 'basic',
              iconUrl: chrome.runtime.getURL('icons/icon-128.png'),
              title: 'CookiePass — Share Imported',
              message: `Someone imported your ${share.domain} share${latestImport.success ? '' : ' (failed)'}`,
            });

            lastImportCheck[share.id] = importTime;
          }
        }
      } catch (error) {
        console.debug('Failed to check imports for share', share.id, error);
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
