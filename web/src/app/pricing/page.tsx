import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CookiePass pricing plans. Start free, upgrade when you need more. Simple, transparent pricing.",
};

const tiers = [
  {
    name: "Free",
    price: "₹0",
    priceSubtext: "forever",
    description: "Perfect for trying out CookiePass",
    features: [
      "5 shares per month",
      "24-hour max expiry",
      "1 import per share",
      "Basic encryption (AES-256)",
      "Community support",
    ],
    notIncluded: [
      "Audit trail",
      "Import notifications",
      "Custom expiry times",
      "API access",
      "Team features",
    ],
    cta: "Get Started Free",
    href: "/auth/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    priceSubtext: "/month",
    description: "For power users who share frequently",
    features: [
      "Unlimited shares",
      "30-day max expiry",
      "Unlimited imports per share",
      "AES-256 encryption",
      "Full audit trail",
      "Import notifications",
      "Custom expiry times",
      "Priority email support",
    ],
    notIncluded: [
      "Team dashboard",
      "SSO integration",
      "API access",
    ],
    cta: "Start 14-Day Free Trial",
    href: "/auth/register",
    highlighted: true,
  },
  {
    name: "Team",
    price: "₹1,499",
    priceSubtext: "/month",
    description: "For teams that need shared access management",
    features: [
      "Everything in Pro",
      "5 team members included (₹299/additional)",
      "Team share dashboard",
      "Role-based access control",
      "SSO integration (SAML, OIDC)",
      "REST API access",
      "Dedicated account manager",
      "Custom branding",
      "SLA guarantee",
      "Onboarding assistance",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    href: "mailto:sales@cookiepass.app",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Nav */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CookiePass
            </span>
          </Link>
          <Link href="/auth/login">
            <Button size="sm">
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Start free, upgrade when you need more. No hidden fees, no
              surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-primary-500 shadow-xl ring-1 ring-primary-500 bg-white dark:bg-gray-900"
                    : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary-500 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {tier.priceSubtext}
                  </span>
                </div>

                {/* Included features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 shrink-0 text-primary-500 mt-0.5"
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
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-700 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                      <span className="text-sm text-gray-400 dark:text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.href}>
                  <Button
                    variant={tier.highlighted ? "primary" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ link */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Have questions?{" "}
              <Link
                href="/#faq"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
              >
                Check our FAQ
              </Link>{" "}
              or{" "}
              <a
                href="mailto:support@cookiepass.app"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
