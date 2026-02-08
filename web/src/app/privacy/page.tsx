import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CookiePass Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: February 8, 2025
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CookiePass (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our Chrome extension and web
              application (collectively, the &ldquo;Service&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Zero-Knowledge Architecture
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CookiePass employs a zero-knowledge architecture for shared session data.
              This means:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Session cookies are encrypted client-side before transmission</li>
              <li>Encryption keys are derived from user-provided passwords</li>
              <li>We never have access to decrypted session data</li>
              <li>Share passwords are never transmitted to or stored on our servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Information We Collect
            </h2>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">
              3.1 Account Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you create an account, we collect your email address, name, and
              hashed password. We use this information to authenticate you and manage
              your account.
            </p>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">
              3.2 Share Metadata
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you create a share, we store metadata including the target domain,
              creation time, expiration time, usage limits, and usage count. We do
              NOT store the actual cookie values in plaintext.
            </p>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4">
              3.3 Import Records
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When someone imports a share, we log the timestamp, approximate
              country (from IP geolocation), browser type, and operating system. IP
              addresses are masked and not stored in full.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
              <li>To provide and maintain the Service</li>
              <li>To manage your account and authentication</li>
              <li>To enforce share limits and expiration</li>
              <li>To provide audit trail functionality</li>
              <li>To detect and prevent abuse</li>
              <li>To improve the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Encrypted share data is automatically deleted 30 days after expiration.
              Account information is retained until you delete your account. Import
              logs are retained for 90 days for audit purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement industry-standard security measures including AES-256
              encryption for shared data, TLS encryption for all communications,
              bcrypt password hashing, and regular security audits. Despite our
              efforts, no method of electronic transmission or storage is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You have the right to access, update, or delete your personal
              information at any time through your account settings. You can also
              request a complete data export or account deletion by contacting us
              at{" "}
              <a
                href="mailto:privacy@cookiepass.app"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                privacy@cookiepass.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use the following third-party services: Vercel (hosting), a cloud
              database provider (data storage), and optional analytics tools. Each
              third-party provider has their own privacy policy governing their use
              of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page and
              updating the &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact
              us at{" "}
              <a
                href="mailto:privacy@cookiepass.app"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                privacy@cookiepass.app
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
