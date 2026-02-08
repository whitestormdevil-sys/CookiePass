'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { BlogPost } from '@/types'

const blogPosts: BlogPost[] = [
  {
    slug: 'why-sharing-passwords-is-dangerous',
    title: 'Why Sharing Passwords is Dangerous (And What to Do Instead)',
    excerpt: 'Password sharing is one of the biggest security risks in modern organizations. Learn why it\'s dangerous and discover secure alternatives that don\'t compromise your security.',
    content: '', // Will be set in individual post pages
    author: 'CookiePass Team',
    publishedAt: '2026-02-08T10:00:00Z',
    readTime: 5,
    tags: ['Security', 'Best Practices', 'Team Collaboration']
  },
  {
    slug: 'cookiepass-encryption-deep-dive',
    title: 'How CookiePass Uses End-to-End Encryption to Protect Your Sessions',
    excerpt: 'A technical deep-dive into CookiePass\'s encryption architecture. Learn how AES-256-GCM keeps your session data secure and why zero-knowledge matters.',
    content: '',
    author: 'CookiePass Team',
    publishedAt: '2026-02-07T14:30:00Z',
    readTime: 8,
    tags: ['Security', 'Technical', 'Encryption']
  },
  {
    slug: 'secure-session-sharing-best-practices',
    title: '5 Best Practices for Secure Session Sharing in Teams',
    excerpt: 'Essential guidelines for safely sharing authenticated sessions across your team. From access controls to audit trails, here\'s what every team should know.',
    content: '',
    author: 'CookiePass Team',
    publishedAt: '2026-02-06T09:15:00Z',
    readTime: 6,
    tags: ['Best Practices', 'Team Management', 'Security']
  }
]

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts

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
              CookiePass Blog
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Security Insights &
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Best Practices </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about session security, encryption, and best practices for protecting your digital identity.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Filter by topic:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedTag === null
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">Try selecting a different topic filter.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredPosts.map((post, index) => (
                  <article key={post.slug}>
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                        <span>•</span>
                        <span>by {post.author}</span>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-indigo-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <button onClick={() => setSelectedTag(tag)}>
                              <Badge 
                                key={tag} 
                                className="text-xs cursor-pointer hover:bg-indigo-50 hover:border-indigo-200"
                              >
                                {tag}
                              </Badge>
                            </button>
                          ))}
                        </div>
                        
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                        >
                          Read full article
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </Card>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Get the latest security insights and CookiePass updates delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}