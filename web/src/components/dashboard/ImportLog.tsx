"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { ImportRecord } from "@/types";

interface ImportLogProps {
  shareId: string;
}

export function ImportLog({ shareId }: ImportLogProps) {
  const [imports, setImports] = useState<ImportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImports = async () => {
      try {
        const response = await api.shares.getImports(shareId);
        
        if (!response.success) {
          throw new Error(response.error || "Failed to fetch import log");
        }

        setImports(response.data?.imports || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load import log");
      } finally {
        setLoading(false);
      }
    };

    fetchImports();
  }, [shareId]);

  const parseUserAgent = (userAgent: string) => {
    // Simple user agent parsing - in production you'd use a library
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    // Browser detection
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";

    // OS detection
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("iPhone")) os = "iOS";
    else if (userAgent.includes("Android")) os = "Android";

    return { browser, os };
  };

  if (loading) {
    return (
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Import History
        </h3>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Import History
        </h3>
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          Error loading import history: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Import History ({imports.length})
      </h3>
      <div className="space-y-3">
        {imports.map((record) => {
          const { browser, os } = parseUserAgent(record.userAgent);
          
          return (
            <div
              key={record.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  record.success 
                    ? "bg-green-100 dark:bg-green-900/30" 
                    : "bg-red-100 dark:bg-red-900/30"
                }`}>
                  {record.success ? (
                    <svg
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-red-600 dark:text-red-400"
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
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {record.success ? "Import successful" : "Import failed"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {browser} &middot; {os} &middot; IP: {record.ipHash.slice(0, 8)}...
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(record.importedAt).toISOString().replace("T", " ").slice(0, 19) + " UTC"}
              </span>
            </div>
          );
        })}

        {imports.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No imports yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
