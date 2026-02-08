// ============================================================================
// CookiePass Validators
// ============================================================================

import type { ShareExpiration, ShareUseLimit } from '@/types';

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate a share link format.
 * Accepts: https://cookiepass.io/s/XXXXX or just the short code.
 */
export function parseShareLink(input: string): { shortCode: string } | null {
  const trimmed = input.trim();

  // Direct short code (5-20 alphanumeric)
  if (/^[a-zA-Z0-9]{5,20}$/.test(trimmed)) {
    return { shortCode: trimmed };
  }

  // Full URL
  try {
    const url = new URL(trimmed);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Expect /s/XXXXX
    if (pathParts.length >= 2 && pathParts[0] === 's') {
      const code = pathParts[1];
      if (/^[a-zA-Z0-9]{5,20}$/.test(code)) {
        return { shortCode: code };
      }
    }
  } catch {
    // Not a valid URL
  }

  return null;
}

/**
 * Validate expiration value.
 */
export function isValidExpiration(exp: string): exp is ShareExpiration {
  return ['1h', '6h', '24h', '7d', '30d'].includes(exp);
}

/**
 * Validate use limit value.
 */
export function isValidUseLimit(limit: number): limit is ShareUseLimit {
  return [1, 3, 5, 10, -1].includes(limit);
}

/**
 * Get human-readable expiration text.
 */
export function expirationToText(exp: ShareExpiration): string {
  const map: Record<ShareExpiration, string> = {
    '1h': '1 hour',
    '6h': '6 hours',
    '24h': '24 hours',
    '7d': '7 days',
    '30d': '30 days',
  };
  return map[exp] || exp;
}

/**
 * Get human-readable use limit text.
 */
export function useLimitToText(limit: ShareUseLimit): string {
  if (limit === -1) return 'Unlimited';
  return `${limit} ${limit === 1 ? 'use' : 'uses'}`;
}

/**
 * Calculate expiration date from now.
 */
export function getExpirationDate(exp: ShareExpiration): Date {
  const now = new Date();
  const map: Record<ShareExpiration, number> = {
    '1h': 60 * 60 * 1000,
    '6h': 6 * 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
  };
  return new Date(now.getTime() + map[exp]);
}

/**
 * Format a date as relative time.
 */
export function relativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const absDiff = Math.abs(diffMs);

  const minutes = Math.floor(absDiff / (60 * 1000));
  const hours = Math.floor(absDiff / (60 * 60 * 1000));
  const days = Math.floor(absDiff / (24 * 60 * 60 * 1000));

  if (diffMs > 0) {
    // Future
    if (minutes < 60) return `in ${minutes}m`;
    if (hours < 24) return `in ${hours}h`;
    return `in ${days}d`;
  } else {
    // Past
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}

/**
 * Validate URL format.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Extract domain from URL.
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}
