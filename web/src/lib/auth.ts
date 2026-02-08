import type { User } from "@/types";

const TOKEN_KEY = "cookiepass_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokens(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function getUserFromToken(): Partial<User> | null {
  const token = getToken();
  if (!token) return null;

  const payload = parseJwt(token);
  if (!payload) return null;

  // Check expiry
  if (payload.exp && (payload.exp as number) * 1000 < Date.now()) {
    clearTokens();
    return null;
  }

  return {
    id: payload.sub as string,
    email: payload.email as string,
    subscription_tier: payload.subscription_tier as User["subscription_tier"],
  };
}

export function logout(): void {
  clearTokens();
  window.location.href = "/auth/login";
}
