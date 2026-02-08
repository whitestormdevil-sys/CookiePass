"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import type { Share } from "@/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const statusVariant = {
  active: "success" as const,
  expired: "warning" as const,
  revoked: "danger" as const,
};

interface ShareTableProps {
  limit?: number;
  status?: string;
}

export function ShareTable({ limit, status }: ShareTableProps = {}) {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const params = { limit: limit || 50 };
        if (status && status !== "all") {
          Object.assign(params, { status });
        }

        const response = await api.shares.list(params);
        
        if (!response.success) {
          if (response.error?.includes("401") || response.error?.includes("Unauthorized")) {
            router.push("/auth/login");
            return;
          }
          throw new Error(response.error || "Failed to fetch shares");
        }

        setShares(response.data?.shares || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load shares");
      } finally {
        setLoading(false);
      }
    };

    fetchShares();
  }, [limit, status, router]);

  const handleView = (shareId: string) => {
    router.push(`/dashboard/shares/${shareId}`);
  };

  const handleRevoke = async (shareId: string) => {
    if (!confirm("Are you sure you want to revoke this share? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await api.shares.revoke(shareId);
      
      if (!response.success) {
        alert(`Failed to revoke share: ${response.error}`);
        return;
      }

      // Update the share in the list
      setShares(prevShares => 
        prevShares.map(share => 
          share.id === shareId 
            ? { ...share, status: "revoked" as const, isRevoked: true }
            : share
        )
      );
    } catch (err) {
      alert(`Error revoking share: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Domain
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Expires
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Imports
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
            {Array.from({ length: limit || 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-2">
          <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (shares.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <svg className="h-12 w-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No shares found</p>
        <p className="text-sm mt-1">Create your first share to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Domain
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Created
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Expires
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Imports
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
          {shares.map((share) => (
            <tr
              key={share.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-500">
                      {share.domain.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {share.domain}
                    </p>
                    <p className="text-xs text-gray-500">
                      {share.cookies} cookies
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge variant={statusVariant[share.status]}>
                  {share.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(share.createdAt)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(share.expiresAt)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {share.currentUses} / {share.maxUses}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleView(share.id)}
                  >
                    View
                  </Button>
                  {share.status === "active" && (
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRevoke(share.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
