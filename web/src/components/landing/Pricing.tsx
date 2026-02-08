"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useScrollReveal();

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
      color: "blue",
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
        "Priority processing",
      ],
      cta: "Start Pro Trial",
      href: "/auth/register?plan=pro",
      popular: true,
      color: "indigo",
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
      color: "purple",
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `₹${price}`;
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white relative">
      <div className="section-container">
        <div className="mx-auto max-w-4xl text-center mb-20">
          <div className="section-label">Pricing</div>
          <h2 className="section-heading">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Enhanced billing toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                isYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                20% off
              </span>
            </button>
          </div>
        </div>

        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`reveal delay-${index + 1} relative ${
                  plan.popular
                    ? 'transform scale-105 z-10'
                    : 'z-0'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative bg-white rounded-3xl p-8 transition-all duration-500 ${
                    plan.popular
                      ? 'border-2 border-indigo-400 shadow-glow-indigo'
                      : 'border border-gray-200 shadow-lg hover:shadow-xl card-lift'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-8">
                      {plan.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-gray-900">
                          {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-lg text-gray-600">
                            /month
                          </span>
                        )}
                      </div>
                      {isYearly && plan.monthlyPrice > 0 && (
                        <div className="text-sm text-gray-500 mt-2">
                          Billed annually (₹{plan.yearlyPrice * 12})
                        </div>
                      )}
                    </div>

                    <Link href={plan.href} className="block mb-8">
                      <Button
                        size="lg"
                        className={`w-full transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-glow-indigo' 
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        variant={plan.popular ? "primary" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>

                    <ul className="space-y-4 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                              plan.color === 'blue' 
                                ? 'text-blue-500' 
                                : plan.color === 'indigo'
                                  ? 'text-indigo-500'
                                  : 'text-purple-500'
                            }`}
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
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-600 text-lg mb-4">
            All plans include 14-day trial • No setup fees • Cancel anytime
          </p>
          <p className="text-gray-500">
            Enterprise plans available for larger organizations.{" "}
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-500 underline font-medium">
              Contact us
            </Link>{" "}
            for custom pricing.
          </p>
        </div>
      </div>
    </section>
  );
}