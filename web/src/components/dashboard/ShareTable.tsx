"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Share } from "@/types";

// Demo data for now
const demoShares: Share[] = [
  {
    id: "1",
    userId: "u1",
    domain: "netflix.com",
    status: "active",
    createdAt: "2025-02-07T10:00:00Z",
    expiresAt: "2025-02-08T10:00:00Z",
    maxUses: 3,
    currentUses: 1,
    passwordProtected: true,
    cookies: 4,
  },
  {
    id: "2",
    userId: "u1",
    domain: "spotify.com",
    status: "active",
    createdAt: "2025-02-06T15:30:00Z",
    expiresAt: "2025-02-09T15:30:00Z",
    maxUses: 5,
    currentUses: 3,
    passwordProtected: true,
    cookies: 2,
  },
  {
    id: "3",
    userId: "u1",
    domain: "github.com",
    status: "expired",
    createdAt: "2025-02-01T08:00:00Z",
    expiresAt: "2025-02-02T08:00:00Z",
    maxUses: 1,
    currentUses: 1,
    passwordProtected: false,
    cookies: 6,
  },
  {
    id: "4",
    userId: "u1",
    domain: "figma.com",
    status: "revoked",
    createdAt: "2025-02-04T12:00:00Z",
    expiresAt: "2025-02-07T12:00:00Z",
    maxUses: 10,
    currentUses: 2,
    passwordProtected: true,
    cookies: 3,
  },
];

const statusVariant = {
  active: "success" as const,
  expired: "warning" as const,
  revoked: "danger" as const,
};

export function ShareTable() {
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
          {demoShares.map((share) => (
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
                      {share.cookies} cookies &middot;{" "}
                      {share.passwordProtected ? "🔒" : "🔓"}
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
                {new Date(share.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {new Date(share.expiresAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                {share.currentUses} / {share.maxUses}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  {share.status === "active" && (
                    <Button variant="danger" size="sm">
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
