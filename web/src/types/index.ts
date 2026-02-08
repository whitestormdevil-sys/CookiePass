// ─── User & Auth ─────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  subscription_tier: "free" | "pro" | "team";
  shares_this_month: number;
  monthly_share_limit: number;
  created_at: string;
}

export interface AuthTokens {
  token: string;
}

// ─── API Responses (Snake Case from Backend) ─────────────────
export interface ApiShareResponse {
  id: string;
  user_id: string;
  domain: string;
  encrypted_data: string;
  expires_at: string;
  max_uses: number;
  used_count: number;
  is_revoked: boolean;
  revoked_at: string | null;
  cookie_count: number;
  created_at: string;
}

export interface ApiImportResponse {
  id: string;
  share_id: string;
  success: boolean;
  user_agent: string;
  ip_hash: string;
  imported_at: string;
}

// ─── Client-Side Types (Camel Case) ──────────────────────────
export interface Share {
  id: string;
  userId: string;
  domain: string;
  status: "active" | "expired" | "revoked";
  createdAt: string;
  expiresAt: string;
  maxUses: number;
  currentUses: number;
  isRevoked: boolean;
  revokedAt: string | null;
  cookies: number;
}

export interface SharePreview {
  id: string;
  domain: string;
  expiresAt: string;
  remainingUses: number;
  status: "active" | "expired" | "revoked" | "limit_reached";
  cookieCount: number;
}

export interface ImportRecord {
  id: string;
  shareId: string;
  importedAt: string;
  success: boolean;
  userAgent: string;
  ipHash: string;
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

// ─── Guides ─────────────────────────────────────────────────
export interface Guide {
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'intermediate' | 'advanced';
  service: string;
  content?: string;
  steps?: GuideStep[];
  updated_at: string;
}

export interface GuideStep {
  title: string;
  description: string;
  image_url?: string;
}

// ─── Blog ─────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
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
