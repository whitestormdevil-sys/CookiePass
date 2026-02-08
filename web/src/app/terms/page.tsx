import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CookiePass Terms of Service — rules and guidelines for using our service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CookiePass
            </span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: February 8, 2025
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using CookiePass (&ldquo;the Service&rdquo;), you agree to be
              bound by these Terms of Service. If you do not agree to these terms,
              you may not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CookiePass is a browser extension and web application that enables
              users to securely share website session cookies with others. The
              Service encrypts session data and provides time-limited, revocable
              access sharing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You agree to use the Service only for lawful purposes. You must NOT:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Share sessions to accounts you do not own or have authorization to share</li>
              <li>Use the Service to circumvent security measures or access controls</li>
              <li>Share sessions that would violate the target website&apos;s terms of service</li>
              <li>Use the Service for any illegal activity</li>
              <li>Attempt to reverse-engineer or exploit the encryption mechanism</li>
              <li>Create accounts with false information</li>
              <li>Sell or commercialize shared sessions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. User Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account. You
              agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Subscriptions and Payments
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CookiePass offers free and paid subscription tiers. Paid subscriptions
              are billed monthly. You may cancel your subscription at any time. Refunds
              are handled on a case-by-case basis for the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The CookiePass web application, branding, and proprietary server-side
              code are owned by CookiePass. The Chrome extension is open-source and
              licensed separately. Your shared session data remains yours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CookiePass is provided &ldquo;as is&rdquo; without warranties of any kind. We are
              not liable for any damages arising from your use of the Service,
              including but not limited to: loss of data, account compromise on third-party
              services, or any consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Security Disclaimer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              While we implement strong encryption and security practices, sharing
              session cookies inherently carries risks. You acknowledge that shared
              sessions may provide temporary access to sensitive accounts and agree
              to use this feature responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time
              if you violate these terms. Upon termination, all active shares will
              be revoked, and your data will be deleted in accordance with our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may modify these terms at any time. Material changes will be
              communicated via email or a prominent notice on our website. Continued
              use of the Service after changes constitutes acceptance of the modified
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the
              laws of India. Any disputes arising from these Terms shall be subject
              to the exclusive jurisdiction of the courts in Bangalore, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Contact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              For questions about these Terms, contact us at{" "}
              <a
                href="mailto:legal@cookiepass.app"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                legal@cookiepass.app
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
