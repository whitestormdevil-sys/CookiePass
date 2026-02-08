// ─── User & Auth ─────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  tier: "free" | "pro" | "team";
  createdAt: string;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Shares ──────────────────────────────────────────────────
export interface Share {
  id: string;
  userId: string;
  domain: string;
  status: "active" | "expired" | "revoked";
  createdAt: string;
  expiresAt: string;
  maxUses: number;
  currentUses: number;
  passwordProtected: boolean;
  cookies: number; // count of cookies in the share
}

export interface SharePreview {
  id: string;
  domain: string;
  expiresAt: string;
  remainingUses: number;
  passwordProtected: boolean;
  status: "active" | "expired" | "revoked" | "limit_reached";
  createdBy: string; // anonymized
}

export interface ImportRecord {
  id: string;
  shareId: string;
  importedAt: string;
  country: string;
  browser: string;
  os: string;
  ip: string; // masked
}

export interface ShareDetails extends Share {
  imports: ImportRecord[];
  shareUrl: string;
}

// ─── API Responses ───────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardStats {
  totalShares: number;
  activeShares: number;
  totalImports: number;
  importsThisWeek: number;
  recentShares: Share[];
  importsByDay: { date: string; count: number }[];
}

// ─── Pricing ─────────────────────────────────────────────────
export interface PricingTier {
  name: string;
  price: string;
  priceSubtext?: string;
  description: string;
  features: string[];
  limitations?: string[];
  cta: string;
  highlighted?: boolean;
}
