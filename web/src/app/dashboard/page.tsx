"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ShareTable } from "@/components/dashboard/ShareTable";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import type { Share } from "@/types";

interface DashboardStats {
  totalShares: number;
  activeShares: number;
  totalImports: number;
  successRate: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentShares, setRecentShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch shares to calculate stats
        const sharesResponse = await api.shares.list({ limit: 50 });
        
        if (!sharesResponse.success) {
          if (sharesResponse.error?.includes("401") || sharesResponse.error?.includes("Unauthorized")) {
            router.push("/auth/login");
            return;
          }
          throw new Error(sharesResponse.error || "Failed to fetch shares");
        }

        const shares = sharesResponse.data?.shares || [];
        const activeShares = shares.filter(s => s.status === "active");
        const totalImports = shares.reduce((sum, s) => sum + s.currentUses, 0);
        
        // Calculate success rate (assume all imports are successful for now)
        const successRate = totalImports > 0 ? "100%" : "0%";

        setStats({
          totalShares: shares.length,
          activeShares: activeShares.length,
          totalImports,
          successRate,
        });

        // Get recent shares (last 5)
        const sortedShares = shares.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentShares(sortedShares.slice(0, 5));
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of your sharing activity
          </p>
        </div>

        {/* Loading Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} hover>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Loading Chart */}
        <Card>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of your sharing activity
          </p>
        </div>
        
        <Card>
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400">Error loading dashboard: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const statsArray = stats ? [
    { label: "Total Shares", value: stats.totalShares.toString(), change: `${recentShares.length} recent` },
    { label: "Active Shares", value: stats.activeShares.toString(), change: `${stats.totalShares - stats.activeShares} expired/revoked` },
    { label: "Total Imports", value: stats.totalImports.toString(), change: "All time" },
    { label: "Success Rate", value: stats.successRate, change: "Based on imports" },
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your sharing activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsArray.map((stat) => (
          <Card key={stat.label} hover>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Chart placeholder - Simple bar representation */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Imports Over Time
        </h2>
        <div className="h-48 flex items-end justify-center space-x-2 p-4">
          {recentShares.slice(0, 7).map((share, i) => (
            <div key={share.id} className="flex flex-col items-center">
              <div 
                className="bg-blue-500 rounded-t w-8 mb-2 transition-all hover:bg-blue-600"
                style={{ height: `${Math.max(20, (share.currentUses / (Math.max(...recentShares.map(s => s.currentUses)) || 1)) * 120)}px` }}
                title={`${share.domain}: ${share.currentUses} imports`}
              ></div>
              <p className="text-xs text-gray-400 transform -rotate-45 origin-top-left whitespace-nowrap">
                {share.domain.split('.')[0]}
              </p>
            </div>
          ))}
          {recentShares.length === 0 && (
            <div className="text-center text-gray-400 dark:text-gray-600">
              <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">No shares yet</p>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Shares */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Shares
          </h2>
        </div>
        <ShareTable limit={5} />
      </Card>
    </div>
  );
}
