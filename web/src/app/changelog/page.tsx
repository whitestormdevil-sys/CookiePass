import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Changelog | CookiePass Product Updates',
  description: 'Stay up to date with the latest CookiePass features, improvements, and bug fixes.',
}

const versions = [
  {
    version: '1.0.0',
    date: '2026-02-08',
    type: 'major',
    title: 'Initial Release',
    description: 'The first public release of CookiePass with core session sharing functionality.',
    features: [
      'Browser extension for Chrome and Chromium browsers',
      'AES-256-GCM client-side encryption',
      'Secure session sharing with expiration controls',
      'Usage limits and instant revocation',
      'Web dashboard for managing shares',
      'Import/export functionality',
      'Real-time activity monitoring',
      'Free tier with 50 shares per month'
    ],
    improvements: [],
    fixes: []
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'major': return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'patch': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'major':
      return (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'minor':
      return (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    case 'patch':
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

export default function Changelog() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-6">
              Product Updates
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              CookiePass
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Changelog </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay up to date with new features, improvements, and bug fixes in CookiePass.
            </p>
          </div>
        </section>

        {/* Current Version Highlight */}
        <section className="py-16 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-3xl font-bold">Current Version: 1.0.0</h2>
              </div>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                The first public release of CookiePass is now available! Download the extension and 
                start sharing sessions securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Link href="/download">Download Now</Link>
                </Button>
                <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                  <a href="https://github.com/whitestormdevil-sys/CookiePass/releases" target="_blank" rel="noopener noreferrer">
                    View on GitHub →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Versions */}
              <div className="space-y-12">
                {versions.map((version, index) => (
                  <div key={version.version} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full"></div>
                    
                    {/* Content */}
                    <div className="ml-20">
                      <Card className="p-8">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                              {getTypeIcon(version.type)}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                v{version.version}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(version.date)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getTypeColor(version.type)}>
                            {version.type.charAt(0).toUpperCase() + version.type.slice(1)} Release
                          </Badge>
                        </div>

                        {/* Title and Description */}
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">
                          {version.title}
                        </h4>
                        <p className="text-gray-600 mb-8">
                          {version.description}
                        </p>

                        {/* Changes */}
                        <div className="space-y-6">
                          {/* Features */}
                          {version.features.length > 0 && (
                            <div>
                              <h5 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Features
                              </h5>
                              <ul className="space-y-2">
                                {version.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Improvements */}
                          {version.improvements.length > 0 && (
                            <div>
                              <h5 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Improvements
                              </h5>
                              <ul className="space-y-2">
                                {version.improvements.map((improvement, improvementIndex) => (
                                  <li key={improvementIndex} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700">{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Bug Fixes */}
                          {version.fixes.length > 0 && (
                            <div>
                              <h5 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Bug Fixes
                              </h5>
                              <ul className="space-y-2">
                                {version.fixes.map((fix, fixIndex) => (
                                  <li key={fixIndex} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700">{fix}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-white p-12 rounded-2xl shadow-sm border">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-7a2 2 0 012-2h3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Get notified when we release new features, security updates, and improvements to CookiePass.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button type="submit" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                Join 1,000+ users getting updates. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Have feedback or feature requests?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We'd love to hear from you. Your feedback helps us prioritize what to build next.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <a href="https://github.com/whitestormdevil-sys/CookiePass/issues" target="_blank" rel="noopener noreferrer">
                  GitHub Issues →
                </a>
              </Button>
              <Button>
                <Link href="/contact">Contact Us →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}