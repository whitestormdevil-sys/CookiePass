"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { ShareTable } from "@/components/dashboard/ShareTable";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const ITEMS_PER_PAGE = 10;

export default function SharesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [totalShares, setTotalShares] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch total count for pagination
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const params = { limit: 1000 }; // Get large number to count total
        if (statusFilter && statusFilter !== "all") {
          Object.assign(params, { status: statusFilter });
        }

        const response = await api.shares.list(params);
        if (response.success && response.data) {
          setTotalShares(response.data.total);
        }
      } catch (err) {
        console.error("Error fetching total count:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalCount();
  }, [statusFilter]);

  const totalPages = Math.ceil(totalShares / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalShares);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.shares.list({ limit: 1000 });
      if (response.success && response.data) {
        const csv = [
          ["Domain", "Status", "Created", "Expires", "Imports", "Max Uses"].join(","),
          ...response.data.shares.map(share => [
            share.domain,
            share.status,
            new Date(share.createdAt).toISOString().split('T')[0],
            new Date(share.expiresAt).toISOString().split('T')[0],
            share.currentUses,
            share.maxUses
          ].join(","))
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cookiepass-shares-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert(`Export failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Shares
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage all your shared sessions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>
          <Button onClick={handleExport}>
            <svg
              className="h-4 w-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Export
          </Button>
        </div>
      </div>

      <Card padding="none">
        <ShareTable 
          limit={ITEMS_PER_PAGE} 
          status={statusFilter === "all" ? undefined : statusFilter}
        />
      </Card>

      {/* Pagination */}
      {!loading && totalShares > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startIndex}-{endIndex} of {totalShares} shares
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              disabled={currentPage <= 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="primary" 
              size="sm" 
              disabled={currentPage >= totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {!loading && totalShares === 0 && (
        <Card>
          <div className="text-center py-12">
            <svg className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No shares found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {statusFilter === "all" ? "You haven't created any shares yet." : `No ${statusFilter} shares found.`}
            </p>
            {statusFilter !== "all" && (
              <Button onClick={() => setStatusFilter("all")}>
                View all shares
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
