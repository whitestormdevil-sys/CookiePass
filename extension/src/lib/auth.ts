// ============================================================================
// CookiePass Auth Helper
// ============================================================================

import type { AuthTokens, User } from '@/types';
import { get, set, remove, KEYS } from './storage';

/**
 * Get stored auth tokens
 */
export async function getAuthTokens(): Promise<AuthTokens | undefined> {
  return get<AuthTokens>(KEYS.AUTH_TOKENS);
}

/**
 * Store auth tokens
 */
export async function setAuthTokens(tokens: AuthTokens): Promise<void> {
  await set(KEYS.AUTH_TOKENS, tokens);
}

/**
 * Get stored user
 */
export async function getUser(): Promise<User | undefined> {
  return get<User>(KEYS.USER);
}

/**
 * Store user data
 */
export async function setUser(user: User): Promise<void> {
  await set(KEYS.USER, user);
}

/**
 * Clear all auth data
 */
export async function clearAuth(): Promise<void> {
  await remove(KEYS.AUTH_TOKENS);
  await remove(KEYS.USER);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const tokens = await getAuthTokens();
  if (!tokens?.accessToken) return false;

  // Check if token is expired (with 60s buffer)
  if (tokens.expiresAt && Date.now() >= (tokens.expiresAt - 60_000)) {
    return false;
  }

  return true;
}

/**
 * Check if user has pro tier
 */
export async function isPro(): Promise<boolean> {
  const user = await getUser();
  return user?.tier === 'pro' || user?.tier === 'team';
}

/**
 * Check remaining shares for free tier
 */
export async function getRemainingShares(): Promise<number> {
  const user = await getUser();
  if (!user) return 0;
  if (user.tier !== 'free') return Infinity;
  return Math.max(0, user.sharesLimit - user.sharesUsedThisMonth);
}
