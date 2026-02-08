import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-40">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950" />
        <div
          className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary-200/40 blur-3xl animate-float dark:bg-primary-900/20"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl animate-float dark:bg-indigo-900/20"
          style={{ animationDelay: "3s" }}
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          {/* Trust badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            AES-256 Encrypted &middot; Zero-Knowledge &middot; Open Source
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            Share access to any website{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              without sharing your password
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl">
            CookiePass lets you securely share website sessions with anyone.
            Time-limited, revocable, and encrypted end-to-end. No passwords
            exposed, ever.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={
                process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                "https://chrome.google.com/webstore"
              }
              target="_blank"
            >
              <Button size="lg" className="gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Install Chrome Extension
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            Free to use &middot; No credit card required &middot; 5 shares/month
            on free plan
          </p>
        </div>

        {/* Hero illustration placeholder */}
        <div className="mt-16 mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900/80">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-gray-400">
                cookiepass.app/s/abc123
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="CookiePass"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Someone shared access with you
                  </div>
                  <div className="text-sm text-gray-500">
                    netflix.com &middot; Expires in 24 hours &middot; 3 uses
                    remaining
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center px-3">
                  <span className="text-sm text-gray-400">
                    Enter share password...
                  </span>
                </div>
                <div className="h-10 px-6 rounded-lg bg-primary-500 text-white flex items-center text-sm font-medium">
                  Import Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
