import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Download CookiePass | Chrome Extension for Secure Session Sharing',
  description: 'Get the CookiePass Chrome extension and start sharing browser sessions securely. Compatible with Chrome, Edge, Brave, and other Chromium browsers.',
}

export default function Download() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-6">
              Chrome Web Store
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get CookiePass for
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Chrome </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Install the CookiePass browser extension and start sharing sessions securely 
              with end-to-end encryption and granular access controls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg">
                <a href="#" className="flex items-center gap-3 px-8 py-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Add to Chrome (Free)
                </a>
              </Button>
              <Button size="lg">
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Free forever • No credit card required • 30-second install
            </p>
          </div>
        </section>

        {/* Browser Compatibility */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Works with Your Browser
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                CookiePass is compatible with all Chromium-based browsers. 
                Install once, use everywhere.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Google Chrome</h3>
                <p className="text-sm text-gray-600">Full support</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Microsoft Edge</h3>
                <p className="text-sm text-gray-600">Full support</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Brave Browser</h3>
                <p className="text-sm text-gray-600">Full support</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Any Chromium</h3>
                <p className="text-sm text-gray-600">Full support</p>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Requires Chrome 88+ or equivalent Chromium version
              </p>
              <p className="text-xs text-gray-400">
                Firefox support coming soon
              </p>
            </div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Install in 3 Simple Steps
              </h2>
              <p className="text-lg text-gray-600">
                Get up and running in under a minute
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Add to Chrome
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click the "Add to Chrome" button above or visit the Chrome Web Store directly. 
                    The extension will install automatically with the necessary permissions.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Permissions needed:</strong> Access to cookies, active tab, and local storage 
                      for secure session management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Create Your Account
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sign up for a free CookiePass account to sync your sessions across devices 
                    and access advanced features like analytics and team sharing.
                  </p>
                  <Button>
                    <Link href="/auth/register">Sign Up Free →</Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Start Sharing Sessions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Navigate to any website, click the CookiePass icon, and create your first 
                    secure session share. Set expiration times, usage limits, and share safely.
                  </p>
                  <Button>
                    <Link href="/docs">View Tutorial →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose CookiePass?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The most secure and user-friendly way to share browser sessions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600 text-sm">
                  AES-256-GCM encryption happens in your browser. We never see your session data.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Expiration</h3>
                <p className="text-gray-600 text-sm">
                  Set custom expiration times and usage limits. Sessions auto-expire for security.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Revocation</h3>
                <p className="text-gray-600 text-sm">
                  Revoke access immediately if needed. No waiting, no delays, instant security.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Track who accessed your shares and when. Complete audit trail for compliance.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600 text-sm">
                  Share with team members, set permissions, and manage access from one dashboard.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
                <p className="text-gray-600 text-sm">
                  Extension code is fully open source. Audit our security, contribute improvements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of developers and teams who trust CookiePass for secure session sharing. 
                Install now and start sharing safely in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <a href="#" className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Install Extension
                  </a>
                </Button>
                <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}