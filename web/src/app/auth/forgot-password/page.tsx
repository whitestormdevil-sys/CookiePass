'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">CookiePass</span>
          </Link>
        </div>

        <Card className="p-8">
          {isSubmitted ? (
            // Success state
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail('')
                  }}
                  className="w-full"
                >
                  Try different email
                </Button>
                <Button variant="ghost" className="w-full">
                  <Link href="/auth/login">Back to login</Link>
                </Button>
              </div>
            </div>
          ) : (
            // Form state
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h2>
                <p className="text-gray-600">
                  No worries! Enter your email address and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={error ? 'border-red-300 focus:ring-red-500' : ''}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!email || isLoading}
                  className="w-full"
                >
                  Send reset link
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </Card>

        {/* Help section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Still having trouble?{' '}
            <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Development Notice</h4>
              <p className="text-xs text-yellow-700 mt-1">
                Password reset emails are not yet implemented. This feature is coming soon!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}