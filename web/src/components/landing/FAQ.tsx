"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FAQ() {
  const containerRef = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does CookiePass work?",
      answer: "CookiePass captures your logged-in session data, encrypts it with AES-256 encryption, and creates a secure sharing link. Recipients use this link and a password you provide to import your session into their browser."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, absolutely. All data is encrypted on your device before transmission using military-grade AES-256 encryption. We never see your passwords or session data in plaintext, and we only store encrypted data on our servers."
    },
    {
      question: "Can I revoke access once shared?",
      answer: "Yes, you have complete control. You can instantly revoke any active share from your dashboard, and the recipient will lose access immediately. You can also set automatic expiration times."
    },
    {
      question: "What websites work with CookiePass?",
      answer: "CookiePass works with virtually any website that uses cookies for authentication. This includes streaming services, social media platforms, productivity tools, and most web applications."
    },
    {
      question: "Do recipients need to create an account?",
      answer: "No, recipients don't need to create an account to import a shared session. They simply need the share link and password you provide them."
    },
    {
      question: "How long do shared sessions last?",
      answer: "You control the duration. Free users can set shares to last up to 24 hours, while Pro and Team users can set shares for up to 30 days. You can also revoke access at any time."
    },
    {
      question: "Can I track who accesses my shares?",
      answer: "Yes, CookiePass provides detailed audit logs showing when shares are accessed, by whom, and from which IP addresses. You can export these logs for compliance purposes."
    },
    {
      question: "Is CookiePass open source?",
      answer: "Yes, our entire codebase is open source and available on GitHub. This allows for community audits and ensures transparency in our security practices."
    },
    {
      question: "What's the difference between plans?",
      answer: "Free users get 5 active shares with 24-hour max duration. Pro users get unlimited shares with 30-day max duration plus advanced analytics. Team users get everything in Pro plus team management and SSO integration."
    },
    {
      question: "Can I use CookiePass for business?",
      answer: "Absolutely! Our Team plan is designed for businesses and includes features like team management, role-based permissions, SSO integration, and priority support."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-gray-50">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="section-label">FAQ</div>
          <h2 className="section-heading">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about CookiePass and secure session sharing.
          </p>
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`reveal delay-${Math.min(index + 1, 6)} bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index 
                    ? 'border-l-4 border-l-indigo-500 bg-indigo-50/50' 
                    : 'border-gray-200 hover:border-indigo-200 card-lift'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-indigo-600 transition-colors leading-tight">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-indigo-100 text-indigo-600 rotate-45' 
                        : 'group-hover:bg-indigo-100 group-hover:text-indigo-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 mb-4" />
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-16" />
            <span className="text-sm font-medium text-gray-500">Still have questions?</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-16" />
          </div>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help.
          </p>
          <a 
            href="mailto:support@cookiepass.app" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}