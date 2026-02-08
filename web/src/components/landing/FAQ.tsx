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
      category: "basics"
    },
    {
      question: "Is my data secure?",
      answer: "Yes, absolutely. All data is encrypted on your device before transmission using military-grade AES-256 encryption. We never see your passwords or session data in plaintext, and we only store encrypted data on our servers.",
      category: "security"
    },
    {
      question: "Can I revoke access once shared?",
      answer: "Yes, you have complete control. You can instantly revoke any active share from your dashboard, and the recipient will lose access immediately. You can also set automatic expiration times.",
      category: "control"
    },
    {
      question: "What websites work with CookiePass?",
      answer: "CookiePass works with virtually any website that uses cookies for authentication. This includes streaming services, social media platforms, productivity tools, and most web applications.",
      category: "basics"
    },
    {
      question: "Do recipients need to create an account?",
      answer: "No, recipients don't need to create an account to import a shared session. They simply need the share link and password you provide them.",
      category: "basics"
    },
    {
      question: "How long do shared sessions last?",
      answer: "You control the duration. Free users can set shares to last up to 24 hours, while Pro and Team users can set shares for up to 30 days. You can also revoke access at any time.",
      category: "control"
    },
    {
      question: "Can I track who accesses my shares?",
      answer: "Yes, CookiePass provides detailed audit logs showing when shares are accessed, by whom, and from which IP addresses. You can export these logs for compliance purposes.",
      category: "control"
    },
    {
      question: "Is CookiePass open source?",
      answer: "Yes, our entire codebase is open source and available on GitHub. This allows for community audits and ensures transparency in our security practices.",
      category: "security"
    },
    {
      question: "What's the difference between plans?",
      answer: "Free users get 5 active shares with 24-hour max duration. Pro users get unlimited shares with 30-day max duration plus advanced analytics. Team users get everything in Pro plus team management and SSO integration.",
      category: "pricing"
    },
    {
      question: "Can I use CookiePass for business?",
      answer: "Absolutely! Our Team plan is designed for businesses and includes features like team management, role-based permissions, SSO integration, and priority support.",
      category: "business"
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-slate-50">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`glass backdrop-blur-xl border-2 rounded-2xl transition-all duration-300 animate-fade-in-up stagger-${(index % 6) + 1} ${
                  openIndex === index 
                    ? 'border-indigo-200 shadow-indigo' 
                    : 'border-gray-200/50 hover:border-indigo-200/70 hover:shadow-lg'
                }`}
              >
                {/* Add subtle category indicator */}
                <div className="relative">
                  {openIndex === index && (
                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full" />
                  )}
                  
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/50 transition-all duration-300 rounded-2xl group"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-indigo-700 transition-colors">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      <div className={`transform transition-all duration-300 ${
                        openIndex === index ? 'rotate-45' : 'rotate-0 group-hover:rotate-90'
                      }`}>
                        {openIndex === index ? (
                          <div className="h-6 w-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </div>
                        ) : (
                          <div className="h-6 w-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300">
                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </span>
                  </button>
                  
                  {/* Smooth height transition */}
                  <div 
                    className={`transition-all duration-500 ease-in-out ${
                      openIndex === index 
                        ? 'max-h-96 opacity-100 pb-6' 
                        : 'max-h-0 opacity-0 pb-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-4" />
                      <p className="text-gray-600 leading-7">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle divider with related questions */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-xs" />
            <span className="text-sm font-medium text-gray-500 px-3">Still have questions?</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-xs" />
          </div>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? We're here to help.
          </p>
          <a 
            href="mailto:support@cookiepass.app" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium hover:underline"
          >
            Contact Support
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}