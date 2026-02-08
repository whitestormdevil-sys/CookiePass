import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CookiePass
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start sharing website access securely
          </p>

          <div className="mt-8">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Right - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-indigo-600 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">
            Why CookiePass?
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "No Password Sharing",
                desc: "Share access without revealing your credentials",
              },
              {
                title: "Full Control",
                desc: "Set time limits, usage caps, and revoke anytime",
              },
              {
                title: "Enterprise Security",
                desc: "AES-256 encryption with zero-knowledge architecture",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-primary-100 text-sm mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
