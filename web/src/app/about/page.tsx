import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About CookiePass | Making Session Sharing Safe',
  description: 'Learn about CookiePass - the secure, open-source solution for sharing browser sessions safely. Built by developers, for developers.',
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Making Session
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Sharing </span>
              Safe
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              CookiePass was born from a simple need: sharing access to services without compromising security. 
              We believe everyone deserves safe, encrypted session sharing.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Traditional password sharing is broken. Teams resort to insecure methods like sharing credentials 
                  through chat, email, or sticky notes. This creates security vulnerabilities and audit nightmares.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  CookiePass eliminates these risks by enabling secure session sharing without ever exposing passwords. 
                  Your team gets the access they need, while your credentials stay private.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>
                    <Link href="/download">Download Extension</Link>
                  </Button>
                  <Button>
                    <Link href="/docs">Read Documentation</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Before CookiePass</h3>
                      <p className="text-gray-600 text-sm">Passwords shared through Slack, email, or documents. Security breaches waiting to happen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">After CookiePass</h3>
                      <p className="text-gray-600 text-sm">Encrypted session sharing with expiration, usage limits, and instant revocation. Zero password exposure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How CookiePass Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple, secure, and transparent. Here&apos;s how we make session sharing safe.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Export Sessions</h3>
                <p className="text-gray-600">
                  Use our Chrome extension to securely export your authenticated sessions from any website.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Create Secure Shares</h3>
                <p className="text-gray-600">
                  Sessions are encrypted client-side with AES-256-GCM before being stored on our secure infrastructure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Controlled Access</h3>
                <p className="text-gray-600">
                  Share encrypted sessions with expiration dates, usage limits, and the ability to revoke access instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <h2 className="text-3xl font-bold text-gray-900">Open Source</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Transparency matters when it comes to security. The CookiePass browser extension is fully open source 
                  under the GPLv3 license. You can review every line of code, contribute improvements, or audit our security.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  While our backend infrastructure remains proprietary to ensure service reliability and security, 
                  all client-side encryption happens in the open-source extension that you control.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>
                    <a href="https://github.com/whitestormdevil-sys/CookiePass" target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                  <Button variant="ghost">
                    <Link href="/docs">Contribute</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "name": "cookiepass-extension",
  "version": "1.0.0",
  "license": "GPL-3.0",
  "description": "Secure session sharing",
  "permissions": [
    "cookies",
    "activeTab",
    "storage"
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self'"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Built by Developers, for Developers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              CookiePass was created by a team of security-minded developers who understand the challenges 
              of modern web development. We&apos;ve experienced the pain of insecure session sharing firsthand, 
              and we&apos;re committed to providing a better solution.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
                <p className="text-gray-600">Every feature is designed with security as the primary consideration.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Developer Experience</h3>
                <p className="text-gray-600">Simple APIs and intuitive workflows that just work.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
                <p className="text-gray-600">Open source and responsive to community feedback.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers and teams who trust CookiePass for secure session sharing.
              </p>
              <Button variant="secondary" size="lg">
                <Link href="/download">Download CookiePass</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}