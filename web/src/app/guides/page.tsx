'use client'

import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/api'
import type { Guide } from '@/types'

export default function Guides() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await api.guides.list()
        if (response.success && response.data) {
          setGuides(response.data)
        } else {
          // Fallback to hardcoded guides if API fails
          setGuides([
            {
              slug: 'gmail-logout',
              title: 'How to Revoke Gmail Sessions',
              description: 'Step-by-step guide to logout from all Gmail devices and revoke active sessions',
              difficulty: 'easy',
              service: 'Gmail',
              updated_at: '2026-02-01T12:00:00Z'
            },
            {
              slug: 'aws-console-sessions',
              title: 'AWS Console Session Management',
              description: 'Managing AWS Console sessions, access keys, and IAM user sessions',
              difficulty: 'intermediate',
              service: 'AWS',
              updated_at: '2026-02-01T12:00:00Z'
            },
            {
              slug: 'github-sessions',
              title: 'GitHub Session Security',
              description: 'Revoking GitHub sessions, managing authorized apps, and SSH keys',
              difficulty: 'easy',
              service: 'GitHub',
              updated_at: '2026-02-01T12:00:00Z'
            },
            {
              slug: 'slack-workspace-sessions',
              title: 'Slack Workspace Access Control',
              description: 'Managing Slack workspace sessions and authorized applications',
              difficulty: 'easy',
              service: 'Slack',
              updated_at: '2026-02-01T12:00:00Z'
            },
            {
              slug: 'google-account-security',
              title: 'Google Account Security Audit',
              description: 'Complete guide to securing your Google account and revoking access',
              difficulty: 'intermediate',
              service: 'Google',
              updated_at: '2026-02-01T12:00:00Z'
            },
            {
              slug: 'microsoft-365-sessions',
              title: 'Microsoft 365 Session Management',
              description: 'Managing Office 365, Azure, and Microsoft account sessions',
              difficulty: 'intermediate',
              service: 'Microsoft',
              updated_at: '2026-02-01T12:00:00Z'
            }
          ])
        }
      } catch (err) {
        setError('Failed to load guides')
        console.error('Error fetching guides:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGuides()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getServiceIcon = (service: string) => {
    // Return appropriate service icons or a default one
    return (
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-6">
              Security Guides
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Session Revocation
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Guides </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Step-by-step instructions for revoking sessions and securing your accounts across popular services.
            </p>
          </div>
        </section>

        {/* Why Session Revocation Matters */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Session Revocation Matters
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                When you share sessions through CookiePass, you maintain control. But knowing how to properly 
                revoke access from the source service adds an extra layer of security.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Incidents</h3>
                  <p className="text-gray-600">
                    Quickly revoke access if you suspect unauthorized use or when team members leave.
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance</h3>
                  <p className="text-gray-600">
                    Meet security audit requirements by demonstrating proper session management practices.
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Practices</h3>
                  <p className="text-gray-600">
                    Regular session cleanup improves account security and reduces attack surface.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{error}</h3>
                <p className="text-gray-600 mb-6">We're having trouble loading the guides right now.</p>
                <Button 
                  variant="primary" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide) => (
                  <Card key={guide.slug} className="p-6 hover:shadow-lg transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                      {getServiceIcon(guide.service)}
                      <Badge 
                        className={getDifficultyColor(guide.difficulty)}
                      >
                        {guide.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {guide.service}
                      </span>
                      <Link 
                        href={`/guides/${guide.slug}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium group-hover:underline"
                      >
                        Read guide →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Need a Custom Guide?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Don&apos;t see a guide for the service you use? Let us know and we&apos;ll create one for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Link href="/contact">Request a Guide</Link>
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