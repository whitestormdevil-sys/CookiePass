import type { ImportRecord } from "@/types";

const demoImports: ImportRecord[] = [
  {
    id: "imp1",
    shareId: "1",
    importedAt: "2025-02-07T14:23:00Z",
    country: "India",
    browser: "Chrome 121",
    os: "Windows 11",
    ip: "103.xx.xx.45",
  },
  {
    id: "imp2",
    shareId: "1",
    importedAt: "2025-02-07T16:45:00Z",
    country: "United States",
    browser: "Chrome 121",
    os: "macOS 14",
    ip: "72.xx.xx.12",
  },
];

export function ImportLog() {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Import History
      </h3>
      <div className="space-y-3">
        {demoImports.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
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
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Imported from {record.country}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {record.browser} &middot; {record.os} &middot; IP:{" "}
                  {record.ip}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(record.importedAt).toLocaleString()}
            </span>
          </div>
        ))}

        {demoImports.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No imports yet
          </div>
        )}
      </div>
    </div>
  );
}
