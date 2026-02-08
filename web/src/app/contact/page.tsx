'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/PublicNav'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get in
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Touch </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about CookiePass? Need help with the extension? 
              We&apos;re here to help you secure your session sharing.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                    <p className="text-gray-600 mb-6">Thanks for reaching out. We&apos;ll get back to you soon.</p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: '', email: '', subject: '', message: '' })
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What can we help you with?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your question or issue..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <Button type="submit" size="lg" loading={isLoading} className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Other ways to reach us</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                        <p className="text-gray-600 mb-2">Get help directly from our team</p>
                        <a
                          href="mailto:support@cookiepass.app"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          support@cookiepass.app
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">GitHub Issues</h3>
                        <p className="text-gray-600 mb-2">Report bugs or request features</p>
                        <a
                          href="https://github.com/whitestormdevil-sys/CookiePass/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Open an issue →
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">FAQ</h3>
                        <p className="text-gray-600 mb-2">Find answers to common questions</p>
                        <Link
                          href="/#faq"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Browse FAQ →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <Card className="p-6 bg-gray-50 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Response Times</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">General inquiries</span>
                      <span className="font-medium text-gray-900">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bug reports</span>
                      <span className="font-medium text-gray-900">12-24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security issues</span>
                      <span className="font-medium text-gray-900">Same day</span>
                    </div>
                  </div>
                </Card>

                {/* Security Contact */}
                <Card className="p-6 border-red-200 bg-red-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900 mb-1">Security Issues</h3>
                      <p className="text-red-700 text-sm mb-2">
                        Found a security vulnerability? Please don&apos;t use public channels.
                      </p>
                      <a
                        href="mailto:security@cookiepass.app"
                        className="text-red-800 hover:text-red-900 font-medium text-sm"
                      >
                        security@cookiepass.app
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}