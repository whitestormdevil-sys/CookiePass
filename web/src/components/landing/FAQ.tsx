"use client";

import { useState } from "react";
import { clsx } from "clsx";

const faqs = [
  {
    question: "Is CookiePass safe to use?",
    answer:
      "Absolutely. CookiePass uses AES-256 encryption — the same standard used by banks and governments. Your session data is encrypted before it leaves your browser and can only be decrypted by someone with the correct password. We never have access to your decrypted session data (zero-knowledge architecture).",
  },
  {
    question: "Can the person I share with see my password?",
    answer:
      "No! CookiePass shares session cookies, not credentials. The recipient gets temporary access to your logged-in session without ever seeing your username or password. They can't change your password or access your account settings.",
  },
  {
    question: "What happens when a share expires?",
    answer:
      "When a share expires, the link becomes inactive and can no longer be used to import cookies. If someone already imported the cookies, those cookies will still be in their browser but will eventually expire naturally based on the original cookie expiration.",
  },
  {
    question: "Can I revoke access after sharing?",
    answer:
      "Yes! You can revoke any share instantly from your dashboard. Once revoked, the share link will no longer work. Note that cookies already imported to someone's browser will remain until they expire or the user clears them.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "CookiePass currently works as a Chrome extension. Firefox and Edge support are on our roadmap. The share import page works in any modern browser, but the extension features (cookie selection, smart detection) require Chrome.",
  },
  {
    question: "Is there a limit to how many shares I can create?",
    answer:
      "Free accounts can create 5 shares per month with 24-hour maximum expiry. Pro accounts get unlimited shares with up to 30-day expiry. Team accounts include everything in Pro plus team management features.",
  },
  {
    question: "Can CookiePass access my passwords or other data?",
    answer:
      "No. CookiePass only accesses cookies for the specific website you choose to share, and only when you explicitly initiate a share. We have no access to your passwords, browsing history, or any other data. The extension is open source so you can verify this yourself.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            FAQ
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={clsx(
                    "h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200",
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
              </button>
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
