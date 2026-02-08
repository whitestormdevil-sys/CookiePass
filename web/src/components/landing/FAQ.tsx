"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does CookiePass work?",
      answer: "CookiePass captures your logged-in session data, encrypts it with AES-256 encryption, and creates a secure sharing link. Recipients use this link and a password you provide to import your session into their browser.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, absolutely. All data is encrypted on your device before transmission using military-grade AES-256 encryption. We never see your passwords or session data in plaintext, and we only store encrypted data on our servers.",
    },
    {
      question: "Can I revoke access once shared?",
      answer: "Yes, you have complete control. You can instantly revoke any active share from your dashboard, and the recipient will lose access immediately. You can also set automatic expiration times.",
    },
    {
      question: "What websites work with CookiePass?",
      answer: "CookiePass works with virtually any website that uses cookies for authentication. This includes streaming services, social media platforms, productivity tools, and most web applications.",
    },
    {
      question: "Do recipients need to create an account?",
      answer: "No, recipients don't need to create an account to import a shared session. They simply need the share link and password you provide them.",
    },
    {
      question: "How long do shared sessions last?",
      answer: "You control the duration. Free users can set shares to last up to 24 hours, while Pro and Team users can set shares for up to 30 days. You can also revoke access at any time.",
    },
    {
      question: "Can I track who accesses my shares?",
      answer: "Yes, CookiePass provides detailed audit logs showing when shares are accessed, by whom, and from which IP addresses. You can export these logs for compliance purposes.",
    },
    {
      question: "Is CookiePass open source?",
      answer: "Yes, our entire codebase is open source and available on GitHub. This allows for community audits and ensures transparency in our security practices.",
    },
    {
      question: "What's the difference between plans?",
      answer: "Free users get 5 active shares with 24-hour max duration. Pro users get unlimited shares with 30-day max duration plus advanced analytics. Team users get everything in Pro plus team management and SSO integration.",
    },
    {
      question: "Can I use CookiePass for business?",
      answer: "Absolutely! Our Team plan is designed for businesses and includes features like team management, role-based permissions, SSO integration, and priority support.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-indigo-600 mb-4">FAQ</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about CookiePass and secure session sharing.
          </p>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-xl"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-7">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}