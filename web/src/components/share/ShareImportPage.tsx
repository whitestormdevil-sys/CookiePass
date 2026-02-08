"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { api } from "@/lib/api";
import type { Share } from "@/types";

interface ShareImportPageProps {
  shareId: string;
}

type ImportState = "loading" | "ready" | "importing" | "success" | "error";

export function ShareImportPage({ shareId }: ShareImportPageProps) {
  const [share, setShare] = useState<Share | null>(null);
  const [password, setPassword] = useState("");
  const [state, setState] = useState<ImportState>("loading");
  const [error, setError] = useState("");
  const [extensionInstalled] = useState(false); // TODO: detect extension
  const [importResult, setImportResult] = useState<{ id: string; imported_at: string; success: boolean } | null>(null);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const response = await api.shares.get(shareId, false); // No auth required for share preview
        
        if (!response.success) {
          setError(response.error || "Failed to load share");
          setState("error");
          return;
        }

        setShare(response.data || null);
        setState("ready");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load share");
        setState("error");
      }
    };

    fetchShare();
  }, [shareId]);

  const getRemainingUses = () => {
    if (!share) return 0;
    return Math.max(0, share.maxUses - share.currentUses);
  };

  const isExpired = share?.status === "expired";
  const isRevoked = share?.status === "revoked";
  const isLimitReached = getRemainingUses() <= 0;
  const isInvalid = isExpired || isRevoked || isLimitReached;

  async function handleImport(e: FormEvent) {
    e.preventDefault();
    if (!extensionInstalled || !share) return;

    setError("");
    setState("importing");

    try {
      const response = await api.shares.import(shareId);
      
      if (!response.success) {
        throw new Error(response.error || "Import failed");
      }

      setImportResult(response.data || null);
      setState("success");
      
      // Update share usage count
      if (share) {
        setShare({
          ...share,
          currentUses: share.currentUses + 1,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
      setState("error");
    }
  }

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading share...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <Image src="/logo.svg" alt="CookiePass" width={36} height={36} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            CookiePass
          </span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-8">
          {/* Success State */}
          {state === "success" && importResult && (
            <div className="text-center py-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Access Imported!
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Session cookies for{" "}
                <strong>{share?.domain}</strong> have been imported to
                your browser. You can now access the site.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Imported at: {new Date(importResult.imported_at).toLocaleString()}
              </p>
              <a
                href={`https://${share?.domain}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-6" size="lg">
                  Go to {share?.domain}
                </Button>
              </a>
            </div>
          )}

          {/* Error States */}
          {(isInvalid || state === "error") && state !== "success" && (
            <div className="text-center py-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {state === "error" && "Error"}
                {isExpired && "Share Expired"}
                {isRevoked && "Share Revoked"}
                {isLimitReached && "Import Limit Reached"}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {state === "error" && error}
                {isExpired && "This share has expired and can no longer be used."}
                {isRevoked && "This share has been revoked by the owner."}
                {isLimitReached && "This share has reached its maximum number of imports."}
              </p>
            </div>
          )}

          {/* Ready State */}
          {!isInvalid && state !== "success" && state !== "error" && share && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Someone shared access with you
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Securely import website session cookies
                </p>
              </div>

              {/* Share Preview */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Domain
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {share.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Expires
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(share.expiresAt).toISOString().replace("T", " ").slice(0, 19) + " UTC"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Remaining Uses
                  </span>
                  <Badge variant="info">{getRemainingUses()} left</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Cookies
                  </span>
                  <Badge variant="default">{share.cookies} cookies</Badge>
                </div>
              </div>

              {/* Extension Check */}
              {!extensionInstalled ? (
                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-amber-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                        CookiePass Extension Required
                      </h3>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                        You need the CookiePass Chrome extension to import
                        shared sessions.
                      </p>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                          "https://chrome.google.com/webstore"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="mt-3">
                          Install CookiePass Extension
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleImport} className="space-y-4">
                  {error && state === "importing" && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    loading={state === "importing"}
                  >
                    Import Access
                  </Button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          Secured with AES-256 encryption &middot; Zero-knowledge
          architecture
          <br />
          <a href="/" className="hover:text-gray-600 dark:hover:text-gray-400">
            Powered by CookiePass
          </a>
        </p>
      </div>
    </div>
  );
}
