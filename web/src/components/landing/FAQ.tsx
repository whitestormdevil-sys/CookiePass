'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How does CookiePass work?",
    answer: "CookiePass uses end-to-end encryption to securely share your browser cookies and session data with trusted recipients. When you create a share, we generate an encrypted payload that can only be decrypted by your intended recipient using a unique key. The recipient simply clicks a secure link to temporarily import the session into their browser—no passwords or manual configuration needed."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Security is our top priority. All session data is encrypted in your browser before it ever reaches our servers using AES-256 encryption. We use a zero-knowledge architecture, meaning we cannot access your cookies or session data. Additionally, all transfers use TLS 1.3, and shared sessions automatically expire after your chosen time limit."
  },
  {
    question: "Can I revoke access once shared?",
    answer: "Yes, you maintain full control over your shared sessions. You can revoke access instantly from your dashboard at any time, even before the expiration date. Once revoked, the secure link becomes immediately invalid and any active sessions are terminated. You'll receive real-time notifications when shares are accessed or revoked."
  },
  {
    question: "What websites work with CookiePass?",
    answer: "CookiePass works with virtually any website that uses standard HTTP cookies or session storage. This includes popular services like Google Workspace, GitHub, Vercel, AWS Console, social media platforms, and internal company tools. As long as the site uses browser-based authentication, CookiePass can securely transfer that session."
  },
  {
    question: "Do recipients need to create an account?",
    answer: "No, recipients don't need a CookiePass account to accept shared sessions. They simply click the secure link you send them, and the session is automatically applied to their browser. However, if they create a free account, they can manage all received shares in one place and set up additional security preferences."
  },
  {
    question: "How long do shared sessions last?",
    answer: "You have full control over session duration. When creating a share, you can set expiration times ranging from 15 minutes to 30 days. For sensitive sessions, we recommend shorter durations. Business users can also set up recurring access schedules for team members who need ongoing—but not permanent—access to specific accounts."
  },
  {
    question: "Can I track who accesses my shares?",
    answer: "Yes, our comprehensive audit log shows you exactly when a share was created, accessed, and expired. You'll see IP addresses (general location only), browser types, and timestamps. Pro and Business users get advanced analytics including access patterns, failed attempt notifications, and the ability to require additional verification steps like email confirmation."
  },
  {
    question: "Is CookiePass open source?",
    answer: "Our browser extension core and encryption libraries are open source and available on GitHub for security auditing. We believe in transparency when handling sensitive data. While our server infrastructure and proprietary security protocols remain private to prevent abuse, the client-side code that handles your data is fully auditable by the security community."
  },
  {
    question: "What's the difference between plans?",
    answer: "Our Free plan includes 5 active shares per month with 24-hour maximum duration. Pro ($8/month) offers unlimited shares, 30-day durations, custom branding, and priority support. Business ($25/user/month) adds SSO integration, admin controls, team analytics, and API access for automated workflows. All plans include the same bank-level encryption."
  },
  {
    question: "Can I use CookiePass for business?",
    answer: "Absolutely. CookiePass Business is designed for teams that need to share access to SaaS tools, staging environments, or client accounts securely. Features include centralized billing, role-based permissions, SAML/SSO integration, and detailed compliance reporting. Many agencies use CookiePass to share temporary access with freelancers without sharing actual passwords."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 sm:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-4">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about CookiePass. Can't find the answer you're looking for? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl border border-gray-200 overflow-hidden
                  transition-all duration-300 ease-in-out
                  ${isOpen ? 'border-l-4 border-l-indigo-500 bg-indigo-50/30' : 'border-l-4 border-l-transparent'}
                `}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <span className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600
                    transition-all duration-200 ease-in-out
                    ${isOpen ? 'rotate-45 bg-indigo-100 text-indigo-600' : ''}
                  `}>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 4v16m8-8H4" 
                      />
                    </svg>
                  </span>
                </button>
                
                <div 
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
