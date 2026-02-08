"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const tiers = [
  {
    name: "Free",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    priceSubtext: "forever",
    description: "Perfect for trying out CookiePass and personal use",
    features: [
      "5 shares per month",
      "24-hour max expiry",
      "1 import per share",
      "AES-256 encryption",
      "Community support",
      "Open source transparency",
      "No credit card required"
    ],
    limitations: [
      "No audit trail",
      "No custom branding",
      "Limited import tracking"
    ],
    cta: "Get Started Free",
    highlighted: false,
    popular: false,
    badge: "Perfect for individuals"
  },
  {
    name: "Pro",
    monthlyPrice: "₹499",
    yearlyPrice: "₹4,990",
    priceSubtext: "/month",
    description: "For power users and professionals who share frequently",
    features: [
      "Unlimited shares",
      "30-day max expiry",
      "Unlimited imports per share",
      "Full audit trail",
      "Priority support",
      "Import notifications",
      "Custom expiry times",
      "Advanced analytics",
      "Password strength enforcer",
      "Bulk operations"
    ],
    limitations: [],
    cta: "Start Pro Trial",
    highlighted: true,
    popular: true,
    badge: "Most popular"
  },
  {
    name: "Team",
    monthlyPrice: "₹1,499",
    yearlyPrice: "₹14,990",
    priceSubtext: "/month",
    description: "For teams that need shared access management and collaboration",
    features: [
      "Everything in Pro",
      "5 team members included",
      "Team share dashboard",
      "Role-based access control",
      "SSO integration (SAML/OAuth)",
      "API access & webhooks",
      "Dedicated support manager",
      "Custom branding",
      "Compliance reporting",
      "Advanced security controls"
    ],
    limitations: [],
    cta: "Contact Sales",
    highlighted: false,
    popular: false,
    badge: "Best for teams"
  },
];

const faqs = [
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied, we'll refund your payment in full."
  },
  {
    question: "Can I change plans anytime?",
    answer: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately and we'll prorate any differences."
  },
  {
    question: "What happens to my shares if I downgrade?",
    answer: "Your existing shares will continue to work until they expire. However, you'll be limited by your new plan's restrictions for new shares."
  },
  {
    question: "Is there a team trial available?",
    answer: "Yes! Contact our sales team to arrange a 14-day free trial of the Team plan for your organization."
  }
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Pricing
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Start free, upgrade when you need more. No hidden fees, no surprise charges.
            Security features included at every level.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                tier.highlighted
                  ? "border-primary-500 bg-white shadow-2xl ring-2 ring-primary-500/20 dark:bg-gray-900 dark:ring-primary-400/20"
                  : "border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                    ⚡ {tier.badge}
                  </span>
                </div>
              )}

              {/* Glow effect for highlighted tier */}
              {tier.highlighted && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-purple-500/10 opacity-50 blur-xl" />
              )}

              <div className="relative p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {tier.name}
                    </h4>
                    {!tier.popular && tier.badge && (
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full px-2 py-1">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    {tier.name !== "Free" && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isYearly ? "/year" : tier.priceSubtext}
                      </span>
                    )}
                  </div>
                  {tier.name === "Free" && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {tier.priceSubtext}
                    </p>
                  )}
                  {isYearly && tier.name !== "Free" && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Save ₹{parseInt(tier.monthlyPrice.replace('₹', '')) * 12 - parseInt(tier.yearlyPrice.replace('₹', ''))} per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    What's included:
                  </h5>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="h-4 w-4 shrink-0 text-green-500 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitations */}
                  {tier.limitations?.length > 0 && (
                    <div className="mt-6">
                      <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Not included:
                      </h6>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start gap-3">
                            <svg
                              className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="text-sm text-gray-400 dark:text-gray-500">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link href="/auth/register" className="block">
                  <Button
                    variant={tier.highlighted ? "primary" : "outline"}
                    className={`w-full ${tier.highlighted ? 'shadow-lg hover:shadow-xl' : ''}`}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </Link>

                {tier.name !== "Free" && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                    Start with 14-day free trial
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Compare all features
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Free</th>
                    <th className="text-center py-3 px-4 font-semibold text-primary-600 dark:text-primary-400">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {[
                    { feature: "Monthly shares", free: "5", pro: "Unlimited", team: "Unlimited" },
                    { feature: "Max expiry time", free: "24 hours", pro: "30 days", team: "30 days" },
                    { feature: "Imports per share", free: "1", pro: "Unlimited", team: "Unlimited" },
                    { feature: "AES-256 encryption", free: "✓", pro: "✓", team: "✓" },
                    { feature: "Audit trail", free: "✗", pro: "✓", team: "✓" },
                    { feature: "Priority support", free: "✗", pro: "✓", team: "✓" },
                    { feature: "Team dashboard", free: "✗", pro: "✗", team: "✓" },
                    { feature: "SSO integration", free: "✗", pro: "✗", team: "✓" },
                    { feature: "API access", free: "✗", pro: "✗", team: "✓" }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">{row.free}</td>
                      <td className="py-4 px-4 text-center text-primary-600 dark:text-primary-400 font-medium">{row.pro}</td>
                      <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">{row.team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-900/30 px-6 py-3 text-sm text-primary-700 dark:text-primary-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>All plans include the same security features — we never compromise on safety!</span>
          </div>
        </div>
      </div>
    </section>
  );
}