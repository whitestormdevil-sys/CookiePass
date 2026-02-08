'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'export-sessions', title: 'Export Sessions' },
    { id: 'import-shares', title: 'Import Shares' },
    { id: 'manage-shares', title: 'Manage Shares' },
    { id: 'revoke-access', title: 'Revoke Access' },
    { id: 'extension-settings', title: 'Extension Settings' },
    { id: 'security', title: 'Security' },
    { id: 'api', title: 'API Reference' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-6">
              Documentation
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Started with
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> CookiePass </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about secure session sharing, from installation to advanced features.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <nav className="sticky top-24">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Contents</h3>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSection(section.id)
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeSection === section.id
                              ? 'bg-indigo-50 text-indigo-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Can&apos;t find what you&apos;re looking for?
                    </p>
                    <Button size="sm" variant="primary">
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </nav>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 prose prose-lg max-w-none">
                <div id="getting-started" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
                  <p className="text-gray-600 mb-6">
                    CookiePass makes it easy to share browser sessions securely without exposing passwords. 
                    Here&apos;s how to get up and running in minutes.
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-yellow-800 mb-2">Before You Start</h3>
                        <p className="text-yellow-700 text-sm">
                          Make sure you have the CookiePass extension installed and a CookiePass account. 
                          <Link href="/download" className="text-yellow-800 underline ml-1">Install now →</Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Install Extension</h3>
                      <p className="text-gray-600 mb-4">
                        Add CookiePass to your Chrome browser from the Chrome Web Store.
                      </p>
                      <Button size="sm" variant="primary">
                        <Link href="/download">Install Guide</Link>
                      </Button>
                    </Card>
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Create Account</h3>
                      <p className="text-gray-600 mb-4">
                        Sign up for a free account to sync sessions across devices.
                      </p>
                      <Button size="sm" variant="primary">
                        <Link href="/auth/register">Sign Up Free</Link>
                      </Button>
                    </Card>
                  </div>
                </div>

                <div id="export-sessions" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Export Sessions</h2>
                  <p className="text-gray-600 mb-6">
                    Exporting a session creates an encrypted snapshot of your cookies for a specific website, 
                    allowing others to access the same logged-in state.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Navigate to the website</h3>
                        <p className="text-gray-600">
                          Go to any website where you&apos;re already logged in (like Gmail, AWS Console, or any service).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Click the CookiePass icon</h3>
                        <p className="text-gray-600">
                          Find the CookiePass extension icon in your browser toolbar and click it.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Configure your share</h3>
                        <p className="text-gray-600 mb-3">Set the expiration time, usage limit, and description for your session share.</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><strong>Expiration:</strong> 1 hour to 30 days</li>
                            <li><strong>Usage limit:</strong> 1 to 100 uses</li>
                            <li><strong>Description:</strong> Optional note about the share</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create and copy the link</h3>
                        <p className="text-gray-600">
                          Click "Create Share" and copy the generated link to share with your team members.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="import-shares" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Import a Share</h2>
                  <p className="text-gray-600 mb-6">
                    When someone shares a CookiePass link with you, importing it will give you access to their logged-in session.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Open the share link</h3>
                        <p className="text-gray-600">
                          Click the CookiePass share link that was sent to you. It will look like: 
                          <code className="bg-gray-100 px-2 py-1 rounded ml-2 text-sm">cookiepass.app/s/abc123</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review the share details</h3>
                        <p className="text-gray-600">
                          You&apos;ll see information about the domain, expiration time, and usage limits before importing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Import the session</h3>
                        <p className="text-gray-600">
                          Click "Import Session" to decrypt and apply the cookies to your browser. 
                          You&apos;ll be automatically redirected to the website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="manage-shares" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Your Shares</h2>
                  <p className="text-gray-600 mb-6">
                    Keep track of all your active session shares from your dashboard.
                  </p>

                  <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Dashboard Features</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        View all active, expired, and revoked shares
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        See usage statistics and access logs
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copy share links and extend expiration
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Revoke access instantly when needed
                      </li>
                    </ul>
                  </Card>

                  <Button>
                    <Link href="/dashboard">Go to Dashboard →</Link>
                  </Button>
                </div>

                <div id="revoke-access" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Revoke Access</h2>
                  <p className="text-gray-600 mb-6">
                    If you need to immediately stop access to a shared session, you can revoke it instantly.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-red-800 mb-2">Important</h3>
                        <p className="text-red-700 text-sm">
                          Revoking a share is permanent and immediate. Users with the link will no longer be able to import the session.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    To revoke a share, go to your dashboard, find the share you want to revoke, and click the "Revoke" button. 
                    The change takes effect immediately.
                  </p>
                </div>

                <div id="extension-settings" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Extension Settings</h2>
                  <p className="text-gray-600 mb-6">
                    Customize how CookiePass works with your browser settings.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Auto-Login</h3>
                      <p className="text-gray-600 mb-3">
                        Automatically sign in to CookiePass when the extension loads.
                      </p>
                      <Badge>Enabled by default</Badge>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h3>
                      <p className="text-gray-600 mb-3">
                        Get notified when shares expire or are accessed.
                      </p>
                      <Badge>Configurable</Badge>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Default Expiration</h3>
                      <p className="text-gray-600 mb-3">
                        Set your preferred default expiration time for new shares.
                      </p>
                      <Badge>24 hours default</Badge>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Filtering</h3>
                      <p className="text-gray-600 mb-3">
                        Choose which cookies to include in session exports.
                      </p>
                      <Badge>Smart filtering</Badge>
                    </Card>
                  </div>
                </div>

                <div id="security" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Overview</h2>
                  <p className="text-gray-600 mb-6">
                    CookiePass uses military-grade encryption to protect your sessions. Here&apos;s how we keep your data secure.
                  </p>

                  <div className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        AES-256-GCM Encryption
                      </h3>
                      <p className="text-gray-600">
                        All session data is encrypted client-side using AES-256-GCM before being sent to our servers. 
                        We never have access to your unencrypted cookies or session data.
                      </p>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 16H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Zero-Knowledge Architecture
                      </h3>
                      <p className="text-gray-600">
                        Our servers only store encrypted data. Even if our databases were compromised, 
                        your session data would remain secure and unreadable.
                      </p>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Automatic Expiration
                      </h3>
                      <p className="text-gray-600">
                        All shares automatically expire and are permanently deleted from our servers. 
                        You can also set usage limits for additional security.
                      </p>
                    </Card>
                  </div>
                </div>

                <div id="api" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">API Reference</h2>
                  <p className="text-gray-600 mb-6">
                    For developers who want to integrate CookiePass into their workflows or build custom tools.
                  </p>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">REST API</h3>
                    <p className="text-gray-600 mb-4">
                      CookiePass provides a complete REST API for managing shares, users, and analytics programmatically.
                    </p>
                    <div className="flex gap-3">
                      <Button>
                        <Link href="/docs/api">View API Docs →</Link>
                      </Button>
                      <Button variant="ghost">
                        <a href="https://github.com/whitestormdevil-sys/CookiePass" target="_blank" rel="noopener noreferrer">
                          GitHub →
                        </a>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}