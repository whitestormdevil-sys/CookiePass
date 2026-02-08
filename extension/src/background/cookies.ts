// ============================================================================
// CookiePass Background Service Worker — Cookie Operations
// ============================================================================

import type { CookieData, TabInfo } from '@/types';

/**
 * Get the current active tab info.
 */
export async function getActiveTab(): Promise<TabInfo | null> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return null;

  try {
    const url = new URL(tab.url);
    return {
      url: tab.url,
      domain: url.hostname,
      title: tab.title || '',
      favIconUrl: tab.favIconUrl,
    };
  } catch {
    return null;
  }
}

/**
 * Get all cookies for a specific URL.
 */
export async function getCookiesForUrl(url: string): Promise<CookieData[]> {
  const cookies = await chrome.cookies.getAll({ url });
  return cookies.map(normalizeCookie);
}

/**
 * Get all cookies for a specific domain.
 */
export async function getCookiesForDomain(domain: string): Promise<CookieData[]> {
  const cookies = await chrome.cookies.getAll({ domain });
  return cookies.map(normalizeCookie);
}

/**
 * Build the correct URL for chrome.cookies.set() from a cookie's properties.
 * The URL must match the cookie's domain and secure flag.
 */
function buildCookieUrl(cookie: CookieData, fallbackDomain: string): string {
  const protocol = cookie.secure ? 'https' : 'http';
  let domain = cookie.domain || fallbackDomain;
  
  // Remove leading dot (e.g. .github.com → github.com)
  domain = domain.replace(/^\./, '');
  
  const path = cookie.path || '/';
  return `${protocol}://${domain}${path}`;
}

/**
 * Set a single cookie in the browser.
 */
export async function setCookie(cookie: CookieData, url: string): Promise<chrome.cookies.Cookie | null> {
  const details: chrome.cookies.SetDetails = {
    url,
    name: cookie.name,
    value: cookie.value,
    path: cookie.path || '/',
    secure: cookie.secure,
    httpOnly: cookie.httpOnly,
    sameSite: normalizeSameSite(cookie.sameSite),
  };

  // Set domain unless hostOnly
  if (!cookie.hostOnly && cookie.domain) {
    details.domain = cookie.domain;
  }

  // Set expiration (if not a session cookie)
  if (cookie.expirationDate) {
    // Ensure expiration is in the future; if it's expired, extend it by 1 year
    const now = Date.now() / 1000;
    if (cookie.expirationDate < now) {
      details.expirationDate = now + 365 * 24 * 60 * 60;
    } else {
      details.expirationDate = cookie.expirationDate;
    }
  }

  // SameSite=none requires secure
  if (details.sameSite === 'no_restriction') {
    details.secure = true;
    // Also force https URL for SameSite=none cookies
    if (details.url.startsWith('http://')) {
      details.url = details.url.replace('http://', 'https://');
    }
  }

  try {
    const result = await chrome.cookies.set(details);
    if (!result) {
      console.warn(`chrome.cookies.set returned null for ${cookie.name} (domain: ${cookie.domain}, url: ${url})`);
    }
    return result;
  } catch (error) {
    console.error(`Failed to set cookie ${cookie.name} (domain: ${cookie.domain}, url: ${url}):`, error);
    return null;
  }
}

/**
 * Set multiple cookies for a domain.
 * Builds per-cookie URLs based on each cookie's actual domain and secure flag.
 */
export async function setCookies(
  cookies: CookieData[],
  domain: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const cookie of cookies) {
    // Build URL from the cookie's own domain, not just the share's domain
    const url = buildCookieUrl(cookie, domain);
    const result = await setCookie(cookie, url);
    if (result) {
      success++;
    } else {
      failed++;
      errors.push(`Failed: ${cookie.name} (${cookie.domain || domain})`);
    }
  }

  return { success, failed, errors };
}

/**
 * Open a URL in a new tab.
 */
export async function openTab(url: string): Promise<chrome.tabs.Tab> {
  return chrome.tabs.create({ url, active: true });
}

// --- Helpers ---

function normalizeCookie(cookie: chrome.cookies.Cookie): CookieData {
  return {
    name: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    path: cookie.path,
    secure: cookie.secure,
    httpOnly: cookie.httpOnly,
    sameSite: cookie.sameSite as CookieData['sameSite'],
    expirationDate: cookie.expirationDate,
    hostOnly: cookie.hostOnly,
    storeId: cookie.storeId,
  };
}

function normalizeSameSite(
  sameSite: string | undefined
): chrome.cookies.SameSiteStatus {
  switch (sameSite?.toLowerCase()) {
    case 'strict':
      return 'strict';
    case 'lax':
      return 'lax';
    case 'no_restriction':
    case 'none':
      return 'no_restriction';
    default:
      return 'unspecified';
  }
}
