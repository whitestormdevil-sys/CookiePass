"use client";

import { useState } from "react";
import { clsx } from "clsx";

const faqs = [
  {
    question: "Is CookiePass safe to use?",
    answer:
      "Absolutely. CookiePass uses military-grade AES-256 encryption — the same standard used by banks and governments worldwide. Your session data is encrypted before it leaves your browser and can only be decrypted by someone with the correct password. We never have access to your decrypted session data (zero-knowledge architecture). Plus, our code is 100% open source for complete transparency.",
    category: "Security"
  },
  {
    question: "Can the person I share with see my password?",
    answer:
      "No! CookiePass shares session cookies, not credentials. The recipient gets temporary access to your logged-in session without ever seeing your username or password. They can't change your password, access your account settings, or view any of your personal information. It's like lending someone your house key without giving them the ability to change the locks.",
    category: "Security"
  },
  {
    question: "What happens when a share expires?",
    answer:
      "When a share expires, the link becomes inactive and can no longer be used to import cookies. If someone already imported the cookies, those cookies will remain in their browser but will eventually expire naturally based on the original website's session timeout. You can also revoke access instantly at any time from your dashboard.",
    category: "Usage"
  },
  {
    question: "Can I revoke access after sharing?",
    answer:
      "Yes! You can revoke any share instantly from your dashboard. Once revoked, the share link will no longer work for new imports. Note that cookies already imported to someone's browser will remain active until they naturally expire or the recipient clears their browser data.",
    category: "Usage"
  },
  {
    question: "Which browsers and websites are supported?",
    answer:
      "CookiePass currently works as a Chrome extension, with Firefox and Edge support coming soon. The extension works with virtually any website that uses cookies for authentication — Netflix, GitHub, Spotify, social media platforms, SaaS tools, e-commerce sites, and more. If you can log into it, you can share it with CookiePass.",
    category: "Compatibility"
  },
  {
    question: "Is there a limit to how many shares I can create?",
    answer:
      "Free accounts can create 5 shares per month with 24-hour maximum expiry. Pro accounts get unlimited shares with up to 30-day expiry times. Team accounts include everything in Pro plus advanced team management features. All plans include the same security features — we never compromise on safety.",
    category: "Pricing"
  },
  {
    question: "Can CookiePass access my passwords or other sensitive data?",
    answer:
      "No. CookiePass only accesses cookies for the specific website you choose to share, and only when you explicitly initiate a share. We have zero access to your passwords, browsing history, personal files, or any other data. The extension runs with minimal permissions and our open source code allows you to verify our claims yourself.",
    category: "Privacy"
  },
  {
    question: "How is this different from password managers?",
    answer:
      "Password managers share your actual credentials, which means the recipient could potentially change your password or access sensitive account settings. CookiePass shares temporary session access without exposing your real passwords. It's faster to set up (30 seconds vs 5-10 minutes), automatically expires, and provides better security isolation.",
    category: "Comparison"
  },
  {
    question: "What if I need to share access to multiple websites?",
    answer:
      "You can create separate shares for each website you want to share. Each share is independent with its own password, expiration time, and usage limits. Pro and Team plans support unlimited shares, making it easy to manage multiple website access for different people or purposes.",
    category: "Usage"
  },
  {
    question: "Is my data stored on your servers?",
    answer:
      "Only encrypted data is stored on our servers, and we can't decrypt it. When you create a share, the cookies are encrypted in your browser before being sent to us. We store the encrypted blob and share metadata (expiration time, usage count), but we never have access to the actual session data. This zero-knowledge architecture ensures your privacy even if our servers were compromised.",
    category: "Privacy"
  }
];

const categories = ["All", "Security", "Usage", "Privacy", "Compatibility", "Pricing", "Comparison"];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            FAQ
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              questions
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about CookiePass. Can't find what you're looking for? 
            Contact our support team.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                className="flex w-full items-start justify-between p-6 text-left hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {faq.question}
                    </h4>
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full px-2 py-1">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={clsx(
                      "h-6 w-6 text-gray-500 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-950/50 dark:to-indigo-950/50 rounded-3xl p-8 border border-primary-200/50 dark:border-primary-800/50">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Get answers from real people who built CookiePass.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:support@cookiepass.app"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-white font-medium hover:bg-primary-600 transition-colors shadow-sm"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="https://github.com/whitestormdevil-sys/CookiePass/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Discussions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}