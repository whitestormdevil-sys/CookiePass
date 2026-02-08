import { Card } from "@/components/ui/Card";
import { ShareTable } from "@/components/dashboard/ShareTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  { label: "Total Shares", value: "24", change: "+3 this week" },
  { label: "Active Shares", value: "4", change: "2 expiring soon" },
  { label: "Total Imports", value: "67", change: "+12 this week" },
  { label: "Success Rate", value: "94%", change: "↑ 2% from last week" },
];

export default function DashboardPage() {
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
        {stats.map((stat) => (
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

      {/* Chart placeholder */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Imports Over Time
        </h2>
        <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
          <div className="text-center">
            <svg
              className="h-12 w-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-sm">Chart will be rendered here</p>
          </div>
        </div>
      </Card>

      {/* Recent Shares */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Shares
          </h2>
        </div>
        <ShareTable />
      </Card>
    </div>
  );
}
