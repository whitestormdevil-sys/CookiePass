import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
      "Basic encryption",
      "Community support",
    ],
    limitations: [
      "No audit trail",
      "No custom branding",
    ],
    cta: "Get Started Free",
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
      "Priority support",
      "Import notifications",
      "Custom expiry times",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "₹1,499",
    priceSubtext: "/month",
    description: "For teams that need shared access management",
    features: [
      "Everything in Pro",
      "5 team members included",
      "Team share dashboard",
      "Role-based access",
      "SSO integration",
      "API access",
      "Dedicated support",
      "Custom branding",
    ],
    limitations: [],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary-500 bg-white shadow-xl ring-1 ring-primary-500 dark:bg-gray-900"
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tier.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  {tier.priceSubtext}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
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
                {tier.limitations?.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600 mt-0.5"
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

              <Link href={tier.name === "Team" ? "/auth/register" : "/auth/register"}>
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
      </div>
    </section>
  );
}
