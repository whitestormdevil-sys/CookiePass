// ============================================================================
// CookiePass Type Definitions
// ============================================================================

// --- Cookie Types ---

export interface CookieData {
  name: string;
  value: string;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: chrome.cookies.SameSiteStatus;
  expirationDate?: number;
  hostOnly?: boolean;
  storeId?: string;
}

export interface AnalyzedCookie extends CookieData {
  classification: 'authentication' | 'other';
  category: CookieCategory;
  confidence: number;
  selected: boolean;
}

export type CookieCategory =
  | 'jwt'
  | 'oauth'
  | 'session'
  | 'csrf'
  | 'persistent_auth'
  | 'authentication'
  | 'tracking'
  | 'preference'
  | 'analytics'
  | 'functional'
  | 'unknown';

// --- Share Types ---

export interface ShareConfig {
  domain: string;
  cookies: CookieData[];
  localStorage?: Record<string, string>;
  sessionStorage?: Record<string, string>;
  expiration: ShareExpiration;
  useLimit: ShareUseLimit;
  password?: string;
  cookieCount?: number;
  webhookUrl?: string;
  customBranding?: CustomBranding;
}

export type ShareExpiration = '1h' | '6h' | '24h' | '7d' | '30d';

export type ShareUseLimit = 1 | 3 | 5 | 10 | -1; // -1 = unlimited

export interface Share {
  id: string;
  shortCode: string;
  domain: string;
  cookieCount: number;
  status: ShareStatus;
  expiration: ShareExpiration;
  expiresAt: string;
  useLimit: ShareUseLimit;
  useCount: number;
  createdAt: string;
  updatedAt: string;
  includesStorage: boolean;
  webhookUrl?: string;
}

export type ShareStatus = 'active' | 'expired' | 'revoked' | 'exhausted';

export interface ShareDetail extends Share {
  imports: ImportLog[];
}

export interface ImportLog {
  id: string;
  shareId: string;
  timestamp: string;
  country?: string;
  browser?: string;
  ipHash?: string;
}

export interface ShareCreateResponse {
  id: string;
  shortCode: string;
  shareUrl: string;
  password: string;
  expiresAt: string;
}

export interface ShareImportPayload {
  encryptedData: string;
  salt: string;
  iv: string;
  domain: string;
  cookieCount: number;
  includesStorage: boolean;
}

// --- Encryption Types ---

export interface EncryptedPayload {
  ciphertext: string; // base64
  salt: string; // base64
  iv: string; // base64
}

export interface DecryptedPayload {
  cookies: CookieData[];
  domain: string;
  localStorage?: Record<string, string>;
  sessionStorage?: Record<string, string>;
  metadata: {
    exportedAt: string;
    version: string;
  };
}

// --- User & Auth Types ---

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  tier: SubscriptionTier;
  sharesUsedThisMonth: number;
  sharesLimit: number;
  subscriptionExpiresAt?: string;
  createdAt: string;
}

export type SubscriptionTier = 'free' | 'pro' | 'team';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// --- Custom Branding ---

export interface CustomBranding {
  logoUrl?: string;
  primaryColor?: string;
  companyName?: string;
}

// --- Settings ---

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  autoDetectAuth: boolean;
  showOnboarding: boolean;
  defaultExpiration: ShareExpiration;
  defaultUseLimit: ShareUseLimit;
  notifications: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  autoDetectAuth: true,
  showOnboarding: true,
  defaultExpiration: '24h',
  defaultUseLimit: 1,
  notifications: true,
};

// --- Message Types (Background <-> Popup/Content) ---

export type MessageType =
  | 'GET_COOKIES'
  | 'SET_COOKIES'
  | 'GET_TAB_INFO'
  | 'GET_LOCAL_STORAGE'
  | 'SET_LOCAL_STORAGE'
  | 'GET_SESSION_STORAGE'
  | 'SET_SESSION_STORAGE'
  | 'CHECK_REVOCATION'
  | 'OPEN_TAB';

export interface ExtensionMessage<T = unknown> {
  type: MessageType;
  payload?: T;
}

export interface ExtensionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// --- Tab Info ---

export interface TabInfo {
  url: string;
  domain: string;
  title: string;
  favIconUrl?: string;
}

// --- API Error ---

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

// --- Domain Block Info ---

export interface DomainBlockInfo {
  isBlocked: boolean;
  category?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  reason?: string;
}

// --- Onboarding ---

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// --- Navigation ---

export type MainTab = 'export' | 'import' | 'shares' | 'settings';
export type BottomNavItem = 'home' | 'activity' | 'profile';
