'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { api } from '@/lib/api'
import type { Guide } from '@/types'

interface GuidePageProps {
  params: {
    slug: string
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  const [guide, setGuide] = useState<Guide | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedGuides, setRelatedGuides] = useState<Guide[]>([])

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await api.guides.get(params.slug)
        if (response.success && response.data) {
          setGuide(response.data)
        } else {
          // Fallback to hardcoded guide if API fails
          const hardcodedGuides: Record<string, Guide> = {
            'gmail-logout': {
              slug: 'gmail-logout',
              title: 'How to Revoke Gmail Sessions',
              description: 'Step-by-step guide to logout from all Gmail devices and revoke active sessions',
              difficulty: 'easy',
              service: 'Gmail',
              updated_at: '2026-02-01T12:00:00Z',
              content: `# How to Revoke Gmail Sessions

When you've shared your Gmail session through CookiePass, you might need to revoke access from Google's side as well. This ensures complete security by logging out all devices.

## Why Revoke Gmail Sessions?

- Someone has unauthorized access to your account
- You shared session access and want to revoke it completely
- You suspect your account has been compromised
- Regular security maintenance

## Step-by-Step Instructions

### Method 1: Sign Out All Devices (Recommended)

This is the quickest way to revoke all Gmail sessions at once.

1. **Open Gmail** - Go to [gmail.com](https://gmail.com) in your browser
2. **Scroll to Bottom** - Scroll down to the bottom of your inbox
3. **Find Account Activity** - Look for "Last account activity" text in the bottom right
4. **Click Details** - Click on "Details" next to the account activity time
5. **Sign Out All Sessions** - In the popup, click "Sign out all other web sessions"
6. **Confirm** - Click "Sign out" to confirm

### Method 2: Google Account Security Page

For more detailed control over your sessions:

1. **Open Google Account** - Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security Tab** - Click on "Security" in the left sidebar
3. **Your Devices** - Scroll down to "Your devices" section
4. **Manage Devices** - Click "Manage all devices"
5. **Review Sessions** - Look through the list of signed-in devices
6. **Remove Devices** - Click the three dots (⋮) next to suspicious devices and select "Sign out"

## Additional Security Steps

After revoking sessions, consider these extra security measures:

- **Change Password** - Update your Gmail password if you suspect compromise
- **Enable 2FA** - Turn on two-factor authentication for added security  
- **Review App Permissions** - Check which apps have access to your Gmail
- **Check Recent Activity** - Review recent login attempts and locations

## Verification

To verify all sessions have been revoked:

1. Check the "Your devices" page shows only your current device
2. Look at "Recent security activity" for any unexpected sign-ins
3. Ensure no unfamiliar locations or devices are listed

## Need More Help?

If you're still seeing unauthorized access:
- Contact Google Support
- Consider temporarily enabling "Less secure app access" restrictions
- Review and revoke third-party app permissions`,
              steps: [
                {
                  title: 'Open Gmail',
                  description: 'Navigate to gmail.com and sign in to your account'
                },
                {
                  title: 'Find Account Activity',
                  description: 'Scroll to bottom and click "Details" next to last activity'
                },
                {
                  title: 'Sign Out All Sessions',
                  description: 'Click "Sign out all other web sessions" and confirm'
                }
              ]
            }
          }

          const hardcodedGuide = hardcodedGuides[params.slug]
          if (hardcodedGuide) {
            setGuide(hardcodedGuide)
          } else {
            setError('Guide not found')
          }
        }

        // Fetch related guides
        const relatedResponse = await api.guides.list()
        if (relatedResponse.success && relatedResponse.data) {
          setRelatedGuides(relatedResponse.data.filter(g => g.slug !== params.slug).slice(0, 3))
        }
      } catch (err) {
        setError('Failed to load guide')
        console.error('Error fetching guide:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [params.slug])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PublicNav />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-1/4"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !guide) {
    notFound()
  }

  const tableOfContents = guide.content
    ? guide.content.match(/^## .+$/gm)?.map(heading => ({
        title: heading.replace('## ', ''),
        id: heading.replace('## ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      })) || []
    : []

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/guides" className="hover:text-gray-900">Guides</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{guide.service}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className={getDifficultyColor(guide.difficulty)}>
                {guide.difficulty}
              </Badge>
              <Badge>
                {guide.service}
              </Badge>
              <span className="text-sm text-gray-500">
                Updated {new Date(guide.updated_at).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {guide.title}
            </h1>
            <p className="text-xl text-gray-600">
              {guide.description}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="mb-8">
                    <Button size="sm" className="mb-4">
                      <Link href="/guides">← Back to Guides</Link>
                    </Button>
                  </div>

                  {tableOfContents.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                        On This Page
                      </h3>
                      <ul className="space-y-2">
                        {tableOfContents.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className="block px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Having trouble following this guide?
                    </p>
                    <Button size="sm" variant="primary">
                      <Link href="/contact">Get Support</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg max-w-none">
                  {guide.content ? (
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: guide.content.replace(/^## (.+)$/gm, (match, title) => {
                          const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                          return `<h2 id="${id}">${title}</h2>`
                        }).replace(/\n/g, '<br>')
                      }} 
                    />
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-8">
                        {guide.description}
                      </p>
                      
                      {guide.steps && guide.steps.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-6">Steps</h2>
                          <div className="space-y-6">
                            {guide.steps.map((step, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-semibold text-indigo-600">{index + 1}</span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                  <p className="text-gray-600">{step.description}</p>
                                  {step.image_url && (
                                    <img src={step.image_url} alt={step.title} className="mt-4 rounded-lg" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedGuides.map((relatedGuide) => (
                  <Card key={relatedGuide.slug} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="text-xs">
                        {relatedGuide.service}
                      </Badge>
                      <Badge 
                        className={getDifficultyColor(relatedGuide.difficulty) + ' text-xs'}
                      >
                        {relatedGuide.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedGuide.description}
                    </p>
                    <Link 
                      href={`/guides/${relatedGuide.slug}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Read guide →
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <PublicFooter />
    </div>
  )
}