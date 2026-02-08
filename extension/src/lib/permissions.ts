// ============================================================================
// CookiePass Permission Handler
// Adapted from cookie-editor's permission model
// ============================================================================

const IMPOSSIBLE_URLS = [
  'about:',
  'moz-extension:',
  'chrome:',
  'chrome-extension:',
  'edge:',
  'safari-web-extension:',
  'chrome-search:',
  'chrome-devtools:',
];

/**
 * Check if a URL can have permissions requested for it.
 */
export function canHavePermissions(url: string): boolean {
  if (!url) return false;
  for (const prefix of IMPOSSIBLE_URLS) {
    if (url.startsWith(prefix)) return false;
  }
  return true;
}

/**
 * Get root domain from hostname for permission matching.
 */
function getRootDomain(hostname: string): string {
  const parts = hostname.split('.').reverse();
  if (parts.length >= 3) {
    if (/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i.test(parts[1])) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
  }
  return `${parts[1]}.${parts[0]}`;
}

/**
 * Build the origins array for a URL's permission request.
 */
function buildOrigins(url: string): string[] {
  try {
    const { protocol, hostname } = new URL(url);
    const rootDomain = getRootDomain(hostname);
    return [
      `${protocol}//${hostname}/*`,
      `${protocol}//*.${rootDomain}/*`,
    ];
  } catch {
    return [url];
  }
}

/**
 * Check if the extension already has permission for a URL.
 */
export async function hasPermission(url: string): Promise<boolean> {
  if (!canHavePermissions(url)) return false;

  try {
    const origins = buildOrigins(url);
    return await chrome.permissions.contains({ origins });
  } catch (err) {
    console.error('Permission check failed:', err);
    return false;
  }
}

/**
 * Request permission for a URL. Must be called from a user gesture (click handler).
 */
export async function requestPermission(url: string): Promise<boolean> {
  if (!canHavePermissions(url)) return false;

  try {
    const origins = buildOrigins(url);
    return await chrome.permissions.request({ origins });
  } catch (err) {
    console.error('Permission request failed:', err);
    return false;
  }
}
