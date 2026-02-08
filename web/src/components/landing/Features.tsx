"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Features() {
  const containerRef = useScrollReveal();

  return (
    <section id="features" className="py-24 sm:py-32 bg-gray-50">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="section-label">Features</div>
          <h2 className="section-heading">
            Everything you need to share securely
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Powerful features designed for both personal users and enterprise teams.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* Large Card 1 - Military-Grade Encryption (2 cols) */}
          <div className="reveal delay-1 md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 card-lift border-gradient">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Military-Grade Encryption
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Every session is protected with AES-256 encryption, the same standard used by governments and financial institutions. Your data remains secure throughout the entire sharing process.
                </p>
              </div>
              {/* Visual illustration */}
              <div className="bg-white/80 rounded-2xl p-6 border border-white/50 shadow-sm">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center mb-2">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Your Data</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="h-6 w-12 bg-blue-300 rounded animate-pulse" />
                    <span className="text-xs text-blue-700 font-medium">AES-256</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center mb-2">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card 1 - Usage Limits (1 col) */}
          <div className="reveal delay-2 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 card-lift border-gradient">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white mb-6">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Usage Limits
            </h3>
            <p className="text-gray-700">
              Control exactly how many times a share can be used. Set limits from 1 to unlimited uses.
            </p>
          </div>

          {/* Medium Card 2 - One-Click Import (1 col) */}
          <div className="reveal delay-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 card-lift border-gradient">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-6">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              One-Click Import
            </h3>
            <p className="text-gray-700">
              Recipients simply click a link and enter the password. No account creation required.
            </p>
          </div>

          {/* Large Card 2 - Full Control & Dashboard (2 cols) */}
          <div className="reveal delay-4 md:col-span-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 card-lift border-gradient">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v-6a2 2 0 002-2h2a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Full Control & Dashboard
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Set expiration times, usage limits, and revoke access instantly. Monitor all shared sessions from your centralized dashboard with detailed logs.
                </p>
              </div>
              {/* Dashboard mockup */}
              <div className="bg-white/80 rounded-2xl p-6 border border-white/50 shadow-sm">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-orange-200/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 text-sm">Netflix Share</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="text-xs text-gray-600 flex justify-between">
                      <span>⏰ 18h remaining</span>
                      <span>👥 3/5 uses</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-orange-200/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 text-sm">GitHub Access</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Expired</span>
                    </div>
                    <div className="text-xs text-gray-600 flex justify-between">
                      <span>⏰ Expired 2h ago</span>
                      <span>👥 5/5 uses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card 1 - Time Limits */}
          <div className="reveal delay-5 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 card-lift border-gradient">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Time Limits
            </h3>
            <p className="text-gray-700 text-sm">
              Set automatic expiration from 1 hour to 30 days
            </p>
          </div>

          {/* Small Card 2 - Audit Trail */}
          <div className="reveal delay-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 card-lift border-gradient">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Audit Trail
            </h3>
            <p className="text-gray-700 text-sm">
              Complete logs of all access attempts and usage
            </p>
          </div>

          {/* Small Card 3 - Revocation */}
          <div className="reveal delay-1 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 card-lift border-gradient">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Revocation
            </h3>
            <p className="text-gray-700 text-sm">
              Cancel access immediately from your dashboard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}