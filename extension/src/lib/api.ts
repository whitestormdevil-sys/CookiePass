// ============================================================================
// CookiePass API Client
// ============================================================================

import type {
  LoginRequest,
  RegisterRequest,
  Share,
  ShareDetail,
  ShareCreateResponse,
  ShareImportPayload,
  User,
  ApiError,
  EncryptedPayload,
  ShareConfig,
  ShareExpiration,
} from '@/types';
import { getAuthTokens, setAuthTokens, setUser, clearAuth } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.cookiepass.io/v1';

// --- HTTP Helpers ---

class ApiClientError extends Error {
  status: number;
  code: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiClientError';
    this.status = error.status;
    this.code = error.code;
  }
}

async function getHeaders(authenticated = true): Promise<HeadersInit> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    const tokens = await getAuthTokens();
    if (tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }
  }

  return headers;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  authenticated = true
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = await getHeaders(authenticated);

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }).catch((fetchErr) => {
    console.error(`[CookiePass] fetch ${method} ${url} failed:`, fetchErr);
    throw new Error(`Failed to fetch`);
  });

  console.log(`[CookiePass] ${method} ${path} → ${response.status}`);

  if (response.status === 401 && authenticated) {
    // Token expired — clear auth and ask user to re-login
    await clearAuth();
    throw new ApiClientError({
      code: 'UNAUTHORIZED',
      message: 'Session expired. Please log in again.',
      status: 401,
    });
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      code: 'UNKNOWN',
      message: `Server error (HTTP ${response.status})`,
      status: response.status,
    }));
    const msg = error.message || error.error || `Request failed (HTTP ${response.status})`;
    console.error(`[CookiePass] ${method} ${path} error:`, error);
    throw new ApiClientError({ ...error, message: msg } as ApiError);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// --- Expiration helpers ---

function expirationToHours(exp: ShareExpiration): number {
  switch (exp) {
    case '1h': return 1;
    case '6h': return 6;
    case '24h': return 24;
    case '7d': return 168;
    case '30d': return 720;
    default: return 24;
  }
}

// --- Auth API ---
// Server returns: { success: true, data: { user: {...}, token: "jwt-string" } }

interface ServerAuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      created_at: string;
      subscription_tier: string;
      shares_this_month: number;
    };
    token: string;
  };
}

function mapServerUser(su: ServerAuthResponse['data']['user']): User {
  return {
    id: su.id,
    email: su.email,
    tier: (su.subscription_tier || 'free') as User['tier'],
    sharesUsedThisMonth: su.shares_this_month || 0,
    sharesLimit: su.subscription_tier === 'pro' ? 100 : su.subscription_tier === 'team' ? 1000 : 5,
    createdAt: su.created_at,
  };
}

export const auth = {
  async login(data: LoginRequest) {
    const response = await request<ServerAuthResponse>('POST', '/auth/login', data, false);
    const token = response.data.token;
    // JWT expires in 7 days (default) — parse or set 7d
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await setAuthTokens({ accessToken: token, refreshToken: '', expiresAt });
    const user = mapServerUser(response.data.user);
    await setUser(user);
    return { user, token };
  },

  async register(data: RegisterRequest) {
    const response = await request<ServerAuthResponse>('POST', '/auth/register', data, false);
    const token = response.data.token;
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await setAuthTokens({ accessToken: token, refreshToken: '', expiresAt });
    const user = mapServerUser(response.data.user);
    await setUser(user);
    return { user, token };
  },

  async logout(): Promise<void> {
    try {
      await request<unknown>('POST', '/auth/logout');
    } finally {
      await clearAuth();
    }
  },

  async getProfile(): Promise<User> {
    const response = await request<{ success: boolean; data: ServerAuthResponse['data']['user'] }>('GET', '/auth/me');
    return mapServerUser(response.data);
  },
};

// --- Share response mapper (snake_case → camelCase) ---

function mapServerShare(s: Record<string, unknown>): Share {
  const isRevoked = !!s.is_revoked;
  const expiresAt = s.expires_at as string;
  const isExpired = expiresAt ? new Date(expiresAt).getTime() < Date.now() : false;
  const usedCount = (s.used_count || 0) as number;
  const maxUses = (s.max_uses || 1) as number;
  const isExhausted = usedCount >= maxUses;

  let status: Share['status'] = 'active';
  if (isRevoked) status = 'revoked';
  else if (isExpired) status = 'expired';
  else if (isExhausted) status = 'exhausted';

  return {
    id: (s.id || s._id) as string,
    shortCode: (s.id || '') as string,
    domain: (s.domain || '') as string,
    cookieCount: (s.cookie_count || 0) as number,
    status,
    expiration: '24h',
    expiresAt: expiresAt || '',
    useLimit: maxUses as Share['useLimit'],
    useCount: usedCount,
    createdAt: (s.created_at || '') as string,
    updatedAt: (s.created_at || '') as string,
    includesStorage: !!((s.settings as Record<string, unknown>)?.includes_storage),
  };
}

// --- Shares API ---
// Server expects: { encrypted_data, domain, expires_in_hours, max_uses, password_salt, settings }
// Server returns: { success, data: { id, domain, expires_at, max_uses, created_at, share_url } }

export const shares = {
  async create(
    encrypted: EncryptedPayload,
    config: Omit<ShareConfig, 'cookies' | 'password'>
  ): Promise<ShareCreateResponse> {
    const response = await request<{
      success: boolean;
      data: {
        id: string;
        domain: string;
        expires_at: string;
        max_uses: number;
        created_at: string;
        share_url: string;
      };
    }>('POST', '/shares', {
      encrypted_data: encrypted.ciphertext,
      domain: config.domain,
      expires_in_hours: expirationToHours(config.expiration),
      max_uses: config.useLimit === -1 ? 10000 : config.useLimit,
      cookie_count: config.cookieCount || 0,
      password_salt: encrypted.salt,
      settings: {
        notify_on_import: true,
        iv: encrypted.iv,
        includes_storage: !!(config.localStorage || config.sessionStorage),
      },
    });

    return {
      id: response.data.id,
      shortCode: response.data.id,
      shareUrl: response.data.share_url,
      password: '', // password is client-side only
      expiresAt: response.data.expires_at,
    };
  },

  async list(status?: string): Promise<Share[]> {
    const query = status ? `?status=${status}` : '';
    const response = await request<{ success: boolean; data: Record<string, unknown>[]; total: number }>('GET', `/shares${query}`);
    return (response.data || []).map(mapServerShare);
  },

  async get(id: string): Promise<ShareDetail> {
    const response = await request<{ success: boolean; data: unknown }>('GET', `/shares/${id}`);
    return response.data as ShareDetail;
  },

  async revoke(id: string): Promise<void> {
    await request<unknown>('DELETE', `/shares/${id}`);
  },

  async getImportData(shortCode: string): Promise<ShareImportPayload & { id: string; expiresAt: string; useCount: number; useLimit: number; status: string }> {
    const response = await request<{ success: boolean; data: Record<string, unknown> }>(
      'GET',
      `/shares/${shortCode}`,
      undefined,
      false
    );
    const d = response.data;
    return {
      id: d.id as string,
      encryptedData: d.encrypted_data as string,
      salt: (d.password_salt || '') as string,
      iv: ((d.settings as Record<string, unknown>)?.iv || '') as string,
      domain: d.domain as string,
      cookieCount: (d.cookie_count || 0) as number,
      includesStorage: !!((d.settings as Record<string, unknown>)?.includes_storage),
      expiresAt: d.expires_at as string,
      useCount: (d.used_count || 0) as number,
      useLimit: (d.max_uses || 1) as number,
      status: d.is_revoked ? 'revoked' : 'active',
    };
  },

  async recordImport(shareId: string): Promise<void> {
    await request<unknown>('POST', `/shares/${shareId}/import`, { success: true });
  },
};

// --- Subscription API ---

export const subscription = {
  async getCheckoutUrl(tier: 'pro' | 'team'): Promise<{ url: string }> {
    return request<{ url: string }>('POST', '/subscription/checkout', { tier });
  },

  async getPortalUrl(): Promise<{ url: string }> {
    return request<{ url: string }>('GET', '/subscription/portal');
  },

  async getStatus(): Promise<{ tier: string; expiresAt: string | null }> {
    return request<{ tier: string; expiresAt: string | null }>('GET', '/subscription/status');
  },
};

export default { auth, shares, subscription };
