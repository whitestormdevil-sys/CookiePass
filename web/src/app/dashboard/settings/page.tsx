import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account and subscription
        </p>
      </div>

      {/* Profile */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Profile
        </h2>
        <div className="space-y-4">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input
            label="Email"
            type="email"
            defaultValue="john@example.com"
            disabled
            hint="Email cannot be changed"
          />
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Subscription */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Subscription
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your plan and billing
            </p>
          </div>
          <Badge variant="info">Free Plan</Badge>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Shares this month
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              3 / 5
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{ width: "60%" }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 p-5">
          <h3 className="font-semibold text-primary-900 dark:text-primary-100">
            Upgrade to Pro
          </h3>
          <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
            Get unlimited shares, 30-day expiry, full audit trail, and more.
          </p>
          <Button className="mt-3" size="sm">
            Upgrade for ₹499/mo
          </Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Change Password
        </h2>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
          />
          <Button>Update Password</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  );
}
