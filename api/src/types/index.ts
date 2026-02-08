// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  subscription_tier: SubscriptionTier;
  subscription_expires_at: Date | null;
  shares_this_month: number;
  shares_month_reset: Date;
  stripe_customer_id: string | null;
  settings: Record<string, unknown>;
}

export type SubscriptionTier = 'free' | 'pro' | 'team';

export interface PublicUser {
  id: string;
  email: string;
  created_at: Date;
  subscription_tier: SubscriptionTier;
  shares_this_month: number;
}

// ─── Share ───────────────────────────────────────────────────────────────────

export interface Share {
  id: string;
  user_id: string;
  domain: string;
  encrypted_data: string;
  password_salt: string | null;
  cookie_count: number;
  created_at: Date;
  expires_at: Date;
  max_uses: number;
  used_count: number;
  is_revoked: boolean;
  revoked_at: Date | null;
  settings: ShareSettings;
}

export interface ShareSettings {
  require_password?: boolean;
  notify_on_import?: boolean;
  auto_revoke_on_max_uses?: boolean;
  [key: string]: unknown;
}

export interface CreateShareInput {
  encrypted_data: string;
  domain: string;
  expires_in_hours: number;
  max_uses?: number;
  cookie_count?: number;
  password_salt?: string;
  settings?: ShareSettings;
}

export interface PublicShare {
  id: string;
  domain: string;
  encrypted_data: string;
  password_salt: string | null;
  expires_at: Date;
  uses_remaining: number | null;
  settings: ShareSettings;
}

// ─── Import ──────────────────────────────────────────────────────────────────

export interface Import {
  id: string;
  share_id: string;
  imported_at: Date;
  ip_hash: string | null;
  user_agent: string | null;
  country: string | null;
  success: boolean;
  error_message: string | null;
  recipient_user_id: string | null;
}

export interface CreateImportInput {
  success: boolean;
  user_agent?: string;
  ip_hash?: string;
  country?: string;
  error_message?: string;
  recipient_user_id?: string;
}

// ─── Revocation Guide ───────────────────────────────────────────────────────

export interface RevocationGuide {
  id: string;
  domain_pattern: string;
  service_name: string;
  instructions: string[];
  settings_url: string | null;
  last_verified_at: Date | null;
  is_active: boolean;
}

// ─── Team ────────────────────────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  owner_id: string;
  created_at: Date;
  settings: Record<string, unknown>;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  invited_at: Date;
  joined_at: Date | null;
}

// ─── Subscription ────────────────────────────────────────────────────────────

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  expires_at: Date | null;
  shares_this_month: number;
  shares_limit: number | null;
  is_active: boolean;
}

export interface CheckoutSession {
  url: string;
  session_id: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  limit: number;
  offset: number;
}

// ─── Config ──────────────────────────────────────────────────────────────────

export interface TierLimits {
  max_shares_per_month: number | null; // null = unlimited
  max_expiration_hours: number;
  max_uses_per_share: number | null; // null = unlimited
}

export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  free: {
    max_shares_per_month: 10,
    max_expiration_hours: 168, // 7 days
    max_uses_per_share: 5,
  },
  pro: {
    max_shares_per_month: null,
    max_expiration_hours: 24 * 30, // 30 days
    max_uses_per_share: null,
  },
  team: {
    max_shares_per_month: null,
    max_expiration_hours: 24 * 30,
    max_uses_per_share: null,
  },
};

// ─── Express extensions ──────────────────────────────────────────────────────

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: User;
    }
  }
}
