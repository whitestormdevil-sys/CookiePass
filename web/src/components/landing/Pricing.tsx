'use client'

import { useState } from 'react'

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-28 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">PRICING</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Start free, upgrade when you need more. No credit card required to get started.
          </p>
        </div>

        <div className="mt-10 flex justify-center items-center gap-3">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                isYearly
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Yearly
            </button>
          </div>
          <span className="text-emerald-600 text-sm font-semibold">Save 20%</span>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free Plan */}
          <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="mt-2 text-gray-600">Perfect for personal use</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">Free</span>
            </div>
            <button className="w-full rounded-full py-3 px-4 text-center font-semibold border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all">
              Get Started Free
            </button>
            <ul className="mt-8 space-y-4">
              {['Unlimited password storage', 'Access on one device', 'Password generator', 'Secure notes', 'Two-factor authentication'].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white rounded-3xl border-2 border-indigo-400 p-8 shadow-xl lg:scale-105 lg:z-10 shadow-[0_0_60px_-15px_rgba(102,99,242,0.3)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-4 py-1 text-sm font-medium">
              Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
              <p className="mt-2 text-gray-600">For power users</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">{isYearly ? '₹399' : '₹499'}</span>
              <span className="text-gray-600 text-lg">/mo</span>
            </div>
            <button className="w-full rounded-full py-3 px-4 text-center font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg transition-all">
              Start Pro Trial
            </button>
            <ul className="mt-8 space-y-4">
              {['Everything in Free', 'Access on unlimited devices', '1GB file storage', 'Secure document sharing', 'Password health reports', 'Emergency access', 'Priority support'].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Plan */}
          <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Team</h3>
              <p className="mt-2 text-gray-600">For small teams</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">{isYearly ? '₹1,199' : '₹1,499'}</span>
              <span className="text-gray-600 text-lg">/mo</span>
            </div>
            <button className="w-full rounded-full py-3 px-4 text-center font-semibold border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all">
              Start Team Trial
            </button>
            <ul className="mt-8 space-y-4">
              {['Everything in Pro', 'Up to 10 team members', 'Admin controls', 'Team password sharing', 'Activity logs', 'User management', 'SSO integration', 'Dedicated onboarding'].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            All plans include 14-day trial • No setup fees • Cancel anytime
          </p>
          <a href="#" className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Need enterprise features? Contact sales →
          </a>
        </div>
      </div>
    </section>
  )
}
