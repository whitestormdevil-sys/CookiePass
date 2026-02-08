"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const plans = [
    {
      name: "Free",
      description: "Perfect for personal use and trying out CookiePass",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "5 active shares",
        "24-hour max expiration",
        "Basic usage tracking",
        "Community support",
        "AES-256 encryption",
      ],
      cta: "Get Started Free",
      href: "/auth/register",
      popular: false,
    },
    {
      name: "Pro",
      description: "Best for power users and small teams",
      monthlyPrice: 499,
      yearlyPrice: 399,
      features: [
        "Unlimited shares",
        "30-day max expiration",
        "Advanced analytics",
        "Email support",
        "Custom share URLs",
        "Usage notifications",
        "Export audit logs",
      ],
      cta: "Start Pro Trial",
      href: "/auth/register?plan=pro",
      popular: true,
    },
    {
      name: "Team",
      description: "For businesses and organizations",
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      features: [
        "Everything in Pro",
        "Team management",
        "Role-based permissions",
        "SSO integration",
        "Priority support",
        "Custom branding",
        "Advanced audit logs",
        "API access",
      ],
      cta: "Start Team Trial",
      href: "/auth/register?plan=team",
      popular: false,
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₹${price}`;
  };

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <p className="text-section-label text-indigo-600 mb-4">Pricing</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                Save 20%
              </span>
            )}
          </div>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 p-8 shadow-sm card-hover ${
                  plan.popular
                    ? 'border-indigo-600 ring-1 ring-indigo-600'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-gray-900">
                        {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-sm text-gray-600">
                          /{isYearly ? 'month' : 'month'}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        Billed annually (₹{plan.yearlyPrice * 12})
                      </div>
                    )}
                  </div>

                  <Link href={plan.href} className="block mb-8">
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul className="space-y-4 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <p className="text-sm text-gray-500">
            Enterprise plans available for larger organizations.{" "}
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
              Contact us
            </Link>{" "}
            for custom pricing.
          </p>
        </div>
      </div>
    </section>
  );
}