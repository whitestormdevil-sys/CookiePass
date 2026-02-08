'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token')
    setToken(tokenFromUrl)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwords.password || !passwords.confirmPassword) return

    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwords.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call - this would normally reset the password
      await new Promise(resolve => setTimeout(resolve, 1500))
      // For now, just show success (since backend doesn't support it yet)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (field: 'password' | 'confirmPassword') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({ ...prev, [field]: e.target.value }))
    setError(null)
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
          {!token ? (
            // Invalid token state
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid reset link</h2>
              <p className="text-gray-600 mb-6">
                This password reset link is invalid or has expired.
              </p>
              <div className="space-y-3">
                <Button className="w-full">
                  <Link href="/auth/forgot-password">Request new reset link</Link>
                </Button>
                <Button variant="ghost" className="w-full">
                  <Link href="/auth/login">Back to login</Link>
                </Button>
              </div>
            </div>
          ) : (
            // Reset form
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h2>
                <p className="text-gray-600">
                  Enter your new password below to secure your account.
                </p>
              </div>

              {/* Coming soon notice */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Feature Coming Soon</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Password reset functionality is currently being developed. This feature will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={passwords.password}
                    onChange={handlePasswordChange('password')}
                    placeholder="Enter new password"
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm new password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    placeholder="Confirm new password"
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={true} // Disabled since feature isn't implemented yet
                  className="w-full opacity-50 cursor-not-allowed"
                >
                  Update password
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
            Need help?{' '}
            <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}