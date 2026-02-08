"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { User } from "@/types";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.auth.me();
        
        if (!response.success) {
          if (response.error?.includes("401") || response.error?.includes("Unauthorized")) {
            router.push("/auth/login");
            return;
          }
          console.error("Failed to fetch user data:", response.error);
        } else {
          setUser(response.data || null);
          setEmail(response.data?.email || "");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const response = await api.user.update({ email });
      
      if (!response.success) {
        alert(`Failed to update profile: ${response.error}`);
      } else {
        setUser(response.data || user);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert(`Error updating profile: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const formatTier = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1) + " Plan";
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "pro":
        return "success" as const;
      case "team":
        return "info" as const;
      default:
        return "default" as const;
    }
  };

  if (loading) {
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

        {/* Loading Cards */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-8 max-w-3xl">
        <Card>
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">
              <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400">Failed to load user data</p>
          </div>
        </Card>
      </div>
    );
  }

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
          <Input 
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Account created: {new Date(user.created_at).toLocaleDateString()}
          </p>
          <Button 
            onClick={handleSaveProfile} 
            disabled={saving || email === user.email}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
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
          <Badge variant={getTierBadgeVariant(user.subscription_tier)}>
            {formatTier(user.subscription_tier)}
          </Badge>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Shares this month
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user.shares_this_month} / {user.monthly_share_limit}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-2 rounded-full bg-primary-500"
              style={{ 
                width: `${Math.min(100, (user.shares_this_month / user.monthly_share_limit) * 100)}%` 
              }}
            />
          </div>
        </div>

        {user.subscription_tier === "free" && (
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
        )}
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
            disabled
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            disabled
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            disabled
          />
          <Button disabled>
            Coming Soon
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Password change functionality will be available soon.
          </p>
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
        <Button variant="danger" disabled>
          Coming Soon - Delete Account
        </Button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Account deletion functionality will be available soon.
        </p>
      </Card>
    </div>
  );
}
