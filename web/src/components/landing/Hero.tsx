import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero py-24 sm:py-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 h-80 w-80 rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col">
            {/* Trust badges */}
            <div className="mb-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="font-medium">Open Source</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">Zero-Knowledge</span>
              </div>
            </div>

            {/* Hero headline */}
            <h1 className="text-hero font-bold tracking-tight text-gray-900 mb-6">
              Share website access{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                without sharing passwords
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-8 mb-8 max-w-xl">
              Securely grant temporary access to any website. Time-limited, revocable, and encrypted end-to-end.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href={
                  process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                  "https://chrome.google.com/webstore"
                }
                target="_blank"
              >
                <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl">
                  Install Free Extension
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 hover:bg-gray-50">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="text-sm text-gray-500 font-medium">
              🔒 AES-256 Encrypted · 🔓 Open Source · 👁️ Zero-Knowledge
            </div>
          </div>

          {/* Right side - Product mockup */}
          <div className="relative">
            {/* Main browser window */}
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-white rounded border px-3 flex items-center">
                    <svg className="h-3 w-3 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs text-gray-500">cookiepass.app/s/abc123</span>
                  </div>
                </div>
              </div>

              {/* CookiePass import interface */}
              <div className="p-6 bg-white">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Import Netflix Access
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        netflix.com
                      </span>
                      <span>⏰ Expires in 24h</span>
                      <span>🔢 5 uses left</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Share Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                    Import & Open Netflix
                  </button>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Protected by AES-256 encryption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating security badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              🔐 Secure
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs">
              <div className="text-2xl font-bold text-indigo-600">10,000+</div>
              <div className="text-sm text-gray-600">Sessions Shared Securely</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}