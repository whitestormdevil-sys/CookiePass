import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-500/10 blob blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-blue-500/10 blob blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-500/15 blob blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        
        {/* Floating decorative dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-indigo-400/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400/20 rounded-full animate-float-delayed" />
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-blue-400/25 rounded-full animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-indigo-400/35 rounded-full animate-float" />
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-purple-400/15 rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float-slow" />
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-indigo-400/25 rounded-full animate-float" />
        <div className="absolute top-1/5 left-3/5 w-2 h-2 bg-purple-400/20 rounded-full animate-float-delayed" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col">
            {/* Trust badges */}
            <div className="mb-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium">AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-sm font-medium">Open Source</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200 text-violet-700 rounded-full">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium">Zero-Knowledge</span>
              </div>
            </div>

            {/* Hero headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-none">
              Share website access{" "}
              <span className="text-gradient">
                without sharing passwords
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
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
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-glow-indigo transition-all duration-300"
                >
                  Install Free Extension
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto glass hover:bg-white/80">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - 3D Browser Mockup */}
          <div className="relative">
            {/* 3D Browser Window */}
            <div 
              className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-float"
              style={{ transform: 'perspective(1200px) rotateY(-8deg) rotateX(3deg)' }}
            >
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                {/* Traffic Light Dots */}
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                {/* URL Bar */}
                <div className="flex-1 mx-4">
                  <div className="h-7 bg-white rounded-md border px-3 flex items-center">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-gray-600">cookiepass.app/import/netflix</span>
                  </div>
                </div>
              </div>

              {/* CookiePass Import UI */}
              <div className="p-8 bg-white">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Netflix Access Shared
                  </h3>
                  <p className="text-gray-600 text-sm">Enter the shared password to access Netflix</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain
                    </label>
                    <input
                      type="text"
                      value="netflix.com"
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter shared password..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">
                    Import & Open Netflix
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    24h remaining
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    5 uses left
                  </span>
                </div>
              </div>
            </div>

            {/* Floating "Secure" Badge */}
            <div className="absolute -top-4 -right-4 glass bg-white/90 backdrop-blur-lg text-emerald-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/40">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 glass bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 animate-float-delayed">
              <div className="text-2xl font-bold text-gradient">10,000+</div>
              <div className="text-sm text-gray-600">Sessions Shared</div>
              <div className="text-xs text-gray-500 mt-1">Securely & Privately</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}