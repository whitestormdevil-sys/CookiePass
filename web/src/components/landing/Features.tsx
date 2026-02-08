'use client'

import { useEffect } from 'react'

export function Features() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-[30px]')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-28 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700">
          <p className="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-4">
            FEATURES
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to share securely
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Securely share passwords, cookies, and credentials with your team without compromising security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-100">
            <div className="group h-full p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center gap-8 h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Military-Grade Encryption</h3>
                  <p className="text-gray-600">
                    End-to-end encryption ensures your sensitive data remains secure during transmission and storage. AES-256 encryption protects every share.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center gap-4 w-full">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-emerald-200">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-emerald-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-200">
            <div className="group h-full p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Limits</h3>
              <p className="text-gray-600">
                Set precise access limits. Control exactly how many times a shared item can be accessed before it self-destructs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-300">
            <div className="group h-full p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-violet-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">One-Click Import</h3>
              <p className="text-gray-600">
                Import your existing credentials instantly. Supports 1Password, Bitwarden, LastPass, and Chrome exports.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-400">
            <div className="group h-full p-10 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row gap-8 h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Full Dashboard Control</h3>
                  <p className="text-gray-600 mb-6">
                    Manage all your shared credentials from a single, intuitive dashboard. Track access, monitor usage, and control permissions in real-time.
                  </p>
                </div>
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-orange-200 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Production API Key</p>
                          <p className="text-xs text-gray-500">Shared 2 hours ago</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Staging Access</p>
                          <p className="text-xs text-gray-500">Shared 5 minutes ago</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">1 view left</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Database Credentials</p>
                          <p className="text-xs text-gray-500">Shared 1 day ago</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Expired</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-500">
            <div className="group h-full p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-3 shadow-lg shadow-rose-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Limits</h3>
              <p className="text-sm text-gray-600">
                Set automatic expiration dates. Shares self-destruct after your specified time period.
              </p>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-600">
            <div className="group h-full p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-3 shadow-lg shadow-cyan-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Trail</h3>
              <p className="text-sm text-gray-600">
                Complete visibility into who accessed what and when. Comprehensive logging for compliance.
              </p>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-700">
            <div className="group h-full p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mb-3 shadow-lg shadow-red-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Revocation</h3>
              <p className="text-sm text-gray-600">
                Revoke access immediately with a single click. Shared links become invalid instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
