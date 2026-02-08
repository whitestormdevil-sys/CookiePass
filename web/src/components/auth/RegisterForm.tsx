"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";
import { setTokens } from "@/lib/auth";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await api.auth.register(email, password);
      if (!res.success) {
        throw new Error(res.error || "Registration failed");
      }
      
      if (res.data?.token) {
        setTokens(res.data.token);
        window.location.href = "/dashboard";
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        hint="Minimum 8 characters"
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          required
          className="mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-primary-600 hover:underline dark:text-primary-400"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary-600 hover:underline dark:text-primary-400"
          >
            Privacy Policy
          </Link>
        </span>
      </div>

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
