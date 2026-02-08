import { getToken } from "./auth";
import type {
  ApiResponse,
  ApiShareResponse,
  ApiImportResponse,
  Share,
  ImportRecord,
  User,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Mappers
function mapShareFromApi(apiShare: ApiShareResponse): Share {
  return {
    id: apiShare.id,
    userId: apiShare.user_id,
    domain: apiShare.domain,
    status: apiShare.is_revoked 
      ? "revoked" 
      : new Date(apiShare.expires_at) < new Date() 
        ? "expired" 
        : "active",
    createdAt: apiShare.created_at,
    expiresAt: apiShare.expires_at,
    maxUses: apiShare.max_uses,
    currentUses: apiShare.used_count,
    isRevoked: apiShare.is_revoked,
    revokedAt: apiShare.revoked_at,
    cookies: apiShare.cookie_count,
  };
}

function mapImportFromApi(apiImport: ApiImportResponse): ImportRecord {
  return {
    id: apiImport.id,
    shareId: apiImport.share_id,
    importedAt: apiImport.imported_at,
    success: apiImport.success,
    userAgent: apiImport.user_agent,
    ipHash: apiImport.ip_hash,
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Attach auth token if present (client-side only)
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: body.error || body.message || `HTTP ${res.status}`,
      };
    }

    // API responses come as { success, data, ...extras }
    // Unwrap body.data as the primary payload, but also spread
    // any sibling fields (total, limit, offset) for list endpoints
    const { success: _s, data: innerData, ...extras } = body;
    const payload = innerData !== undefined ? innerData : body;
    
    // For list endpoints that have sibling fields like total/limit/offset,
    // merge them into the response data
    if (Object.keys(extras).length > 0 && typeof payload === 'object' && !Array.isArray(payload)) {
      return { success: true, data: { ...payload, ...extras } };
    }
    // For array data with extras (like GET /shares), wrap in object
    if (Object.keys(extras).length > 0 && Array.isArray(payload)) {
      return { success: true, data: { items: payload, ...extras } };
    }
    
    return { success: true, data: payload };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

// ─── Auth ────────────────────────────────────────────────────
export const api = {
  auth: {
    async login(email: string, password: string) {
      return request<{ user: User; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    async register(email: string, password: string) {
      return request<{ user: User; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    async logout() {
      return request<{ message: string }>("/auth/logout", {
        method: "POST",
      });
    },
    async me() {
      return request<User>("/auth/me");
    },
  },

  // ─── Shares ──────────────────────────────────────────────────
  shares: {
    async list(params?: { status?: string; page?: number; limit?: number }) {
      const query = new URLSearchParams();
      if (params?.status) query.set("status", params.status);
      if (params?.page) query.set("offset", String((params.page - 1) * (params.limit || 10)));
      if (params?.limit) query.set("limit", String(params.limit));
      const qs = query.toString();
      
      const response = await request<{
        items: ApiShareResponse[];
        total: number;
        limit: number;
        offset: number;
      }>(`/shares${qs ? `?${qs}` : ""}`);
      
      if (response.success && response.data) {
        const items = response.data.items || [];
        return {
          success: true,
          data: {
            shares: items.map(mapShareFromApi),
            total: response.data.total || 0,
            limit: response.data.limit || 20,
            offset: response.data.offset || 0,
          },
        };
      }
      
      return {
        success: false,
        error: response.error || "Failed to fetch shares",
      };
    },
    
    async get(id: string, requireAuth: boolean = true) {
      const options: RequestInit = {};
      if (!requireAuth) {
        options.headers = { "Authorization": "" };
      }
      
      const response = await request<ApiShareResponse>(`/shares/${id}`, options);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: mapShareFromApi(response.data),
        };
      }
      
      return {
        success: false,
        error: response.error || "Failed to fetch share",
      };
    },
    
    async revoke(id: string) {
      const response = await request<ApiShareResponse>(`/shares/${id}`, {
        method: "DELETE",
      });
      
      if (response.success && response.data) {
        return {
          success: true,
          data: mapShareFromApi(response.data),
        };
      }
      
      return {
        success: false,
        error: response.error || "Failed to revoke share",
      };
    },
    
    async getImports(id: string) {
      const response = await request<{
        items: ApiImportResponse[];
        total: number;
      }>(`/shares/${id}/imports`);
      
      if (response.success && response.data) {
        const items = response.data.items || [];
        return {
          success: true,
          data: {
            imports: items.map(mapImportFromApi),
            total: response.data.total || 0,
          },
        };
      }
      
      return {
        success: false,
        error: response.error || "Failed to fetch imports",
      };
    },
    
    async import(id: string) {
      return request<{ id: string; imported_at: string; success: boolean }>(`/shares/${id}/import`, {
        method: "POST",
      });
    },
  },

  // ─── User ──────────────────────────────────────────────────────
  user: {
    async update(data: Partial<{ email: string }>) {
      return request<User>("/user", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  },
};
