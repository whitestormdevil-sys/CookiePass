import type {
  ApiResponse,
  AuthTokens,
  DashboardStats,
  Share,
  ShareDetails,
  SharePreview,
  User,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
    const token = localStorage.getItem("cookiepass_token");
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || data.message || `HTTP ${res.status}`,
      };
    }

    return { success: true, data };
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
    login(email: string, password: string) {
      return request<AuthTokens>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    register(email: string, password: string, name: string) {
      return request<AuthTokens>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
    },
    me() {
      return request<User>("/auth/me");
    },
  },

  // ─── Shares ──────────────────────────────────────────────────
  shares: {
    list(params?: { status?: string; page?: number; limit?: number }) {
      const query = new URLSearchParams();
      if (params?.status) query.set("status", params.status);
      if (params?.page) query.set("page", String(params.page));
      if (params?.limit) query.set("limit", String(params.limit));
      const qs = query.toString();
      return request<{ shares: Share[]; total: number }>(
        `/shares${qs ? `?${qs}` : ""}`
      );
    },
    get(id: string) {
      return request<ShareDetails>(`/shares/${id}`);
    },
    revoke(id: string) {
      return request<Share>(`/shares/${id}/revoke`, { method: "POST" });
    },
    preview(id: string) {
      return request<SharePreview>(`/shares/${id}/preview`);
    },
    import(id: string, password?: string) {
      return request<{ cookies: unknown[] }>(`/shares/${id}/import`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
    },
  },

  // ─── Dashboard ─────────────────────────────────────────────────
  dashboard: {
    stats() {
      return request<DashboardStats>("/dashboard/stats");
    },
  },

  // ─── User ──────────────────────────────────────────────────────
  user: {
    update(data: Partial<User>) {
      return request<User>("/user", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    updatePassword(currentPassword: string, newPassword: string) {
      return request<{ success: boolean }>("/user/password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },
  },
};
