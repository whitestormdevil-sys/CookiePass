'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { api } from '@/lib/api'
import type { User } from '@/types'

export default function BillingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await api.auth.me()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        setError('Failed to load billing information')
      }
    } catch (err) {
      setError('Failed to load billing information')
      console.error('Error fetching user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPlanInfo = (tier: string) => {
    switch (tier) {
      case 'free':
        return {
          name: 'Free',
          price: '$0',
          features: [
            '50 shares per month',
            'Basic encryption',
            'Usage limits',
            'Expiration controls',
            'Community support'
          ]
        }
      case 'pro':
        return {
          name: 'Pro',
          price: '$9',
          features: [
            '500 shares per month',
            'Priority support',
            'Advanced analytics',
            'Custom expiration times',
            'Team management',
            'API access'
          ]
        }
      case 'team':
        return {
          name: 'Team',
          price: '$29',
          features: [
            'Unlimited shares',
            'Dedicated support',
            'Advanced analytics',
            'SSO integration',
            'Team management',
            'API access',
            'Custom branding'
          ]
        }
      default:
        return {
          name: 'Free',
          price: '$0',
          features: []
        }
    }
  }

  const usagePercentage = user 
    ? Math.min((user.shares_this_month / user.monthly_share_limit) * 100, 100)
    : 0

  const plans = [
    {
      tier: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for personal use and trying out CookiePass',
      features: [
        '50 shares per month',
        'Basic encryption (AES-256-GCM)',
        'Usage limits & expiration',
        'Community support',
        'Open source extension'
      ],
      limitations: [
        'Limited analytics',
        'Email support only'
      ],
      cta: 'Current Plan',
      current: user?.subscription_tier === 'free'
    },
    {
      tier: 'pro',
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For professionals and power users who need more',
      features: [
        'Everything in Free, plus:',
        '500 shares per month',
        'Priority support',
        'Advanced analytics',
        'Custom expiration times',
        'API access',
        'Email notifications'
      ],
      limitations: [],
      cta: user?.subscription_tier === 'free' ? 'Upgrade to Pro' : 'Current Plan',
      current: user?.subscription_tier === 'pro',
      highlighted: true
    },
    {
      tier: 'team',
      name: 'Team',
      price: '$29',
      period: '/month',
      description: 'For teams that need advanced features and support',
      features: [
        'Everything in Pro, plus:',
        'Unlimited shares',
        'Dedicated support',
        'SSO integration',
        'Team management',
        'Custom branding',
        'SLA guarantee'
      ],
      limitations: [],
      cta: user?.subscription_tier === 'team' ? 'Current Plan' : 'Contact Sales',
      current: user?.subscription_tier === 'team'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Card className="p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </Card>
        </div>
      ) : error ? (
        <Card className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load billing information</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchUserData}>
              Try again
            </Button>
          </div>
        </Card>
      ) : user ? (
        <>
          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
                  <Badge className={
                    user.subscription_tier === 'team' ? 'bg-purple-100 text-purple-800' :
                    user.subscription_tier === 'pro' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {getPlanInfo(user.subscription_tier).name}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {getPlanInfo(user.subscription_tier).price}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </p>
                <ul className="space-y-2">
                  {getPlanInfo(user.subscription_tier).features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {user.subscription_tier === 'free' && (
                <div>
                  <Button size="lg">
                    <Link href="/pricing">Upgrade to Pro</Link>
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Usage Stats */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Usage This Month</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Shares Created</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {user.shares_this_month} / {user.monthly_share_limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      usagePercentage >= 90 ? 'bg-red-500' :
                      usagePercentage >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                {usagePercentage >= 90 && (
                  <p className="text-xs text-red-600 mt-2">
                    You're running low on shares. Consider upgrading to Pro for more capacity.
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Shares remaining</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.monthly_share_limit - user.shares_this_month}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Usage percentage</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(usagePercentage)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Resets on</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing History</h2>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                Billing history and invoice management will be available in the next update.
              </p>
              {user.subscription_tier !== 'free' && (
                <p className="text-sm text-gray-500">
                  Need an invoice? <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">Contact support</Link>
                </p>
              )}
            </div>
          </Card>

          {/* Plan Comparison */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Plans</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.tier}
                  className={`p-6 relative ${
                    plan.highlighted ? 'border-2 border-indigo-500 shadow-lg' : ''
                  } ${plan.current ? 'bg-gray-50' : ''}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-indigo-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  
                  {plan.current && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={feature.startsWith('Everything') ? 'font-medium text-gray-900' : 'text-gray-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <ul className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-500">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <Button
                    variant={plan.current ? 'outline' : plan.highlighted ? 'primary' : 'outline'}
                    disabled={plan.current}
                    className="w-full"
                  >
                    {plan.current ? (
                      <span>{plan.cta}</span>
                    ) : plan.tier === 'team' ? (
                      <Link href="/contact">{plan.cta}</Link>
                    ) : (
                      <Link href="/pricing">{plan.cta}</Link>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Questions about billing?</h3>
                <p className="text-blue-700 mb-4">
                  Our team is here to help with any questions about plans, billing, or upgrades.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link href="/pricing">View Pricing Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : null}
    </div>
  )
}