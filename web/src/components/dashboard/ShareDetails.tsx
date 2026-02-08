import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ShareDetailsProps {
  shareId: string;
}

export function ShareDetails({ shareId }: ShareDetailsProps) {
  // This would fetch data from API in production
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Share Details
          </h2>
          <p className="text-sm text-gray-500">ID: {shareId}</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Domain</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            netflix.com
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Cookies</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            4
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Imports</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            1 / 3
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Expires</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            23h left
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Share Link
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 font-mono">
            https://cookiepass.app/s/{shareId}
          </div>
          <Button variant="secondary" size="sm">
            Copy
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Actions
        </h3>
        <div className="flex gap-3">
          <Button variant="danger">Revoke Share</Button>
          <Button variant="outline">Extend Expiry</Button>
        </div>
      </Card>
    </div>
  );
}
