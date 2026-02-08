import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-40">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-indigo-50/80 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/50" />
        
        {/* Animated blobs */}
        <div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary-200/40 to-indigo-200/40 blur-3xl animate-float dark:from-primary-900/30 dark:to-indigo-900/30"
          aria-hidden="true"
        />
        <div
          className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl animate-float dark:from-indigo-900/20 dark:to-purple-900/20"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl animate-float dark:from-purple-900/30 dark:to-pink-900/30"
          style={{ animationDelay: "4s" }}
          aria-hidden="true"
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPgo=')] opacity-40 dark:opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          {/* Enhanced trust badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary-200 bg-primary-50/80 backdrop-blur-sm px-6 py-2 text-sm text-primary-700 shadow-sm dark:border-primary-800 dark:bg-primary-950/80 dark:text-primary-300">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-medium">AES-256</span>
            </div>
            <div className="h-4 w-px bg-primary-300 dark:bg-primary-700" />
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="font-medium">Zero Knowledge</span>
            </div>
            <div className="h-4 w-px bg-primary-300 dark:bg-primary-700" />
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span className="font-medium">Open Source</span>
            </div>
          </div>

          {/* Enhanced headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl leading-tight">
            Share website access{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                without passwords
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 rounded-full opacity-30 animate-gradient-x bg-[length:200%_auto]" />
            </span>
          </h1>

          {/* Enhanced subheading */}
          <p className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-300 sm:text-2xl max-w-3xl mx-auto">
            Securely share website sessions with family, team members, or clients.{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              Time-limited, revocable, and encrypted end-to-end.
            </span>{" "}
            No passwords exposed, ever.
          </p>

          {/* Social proof */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Trusted by 10,000+ users</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.8/5 Chrome Store Rating</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>50,000+ sessions shared</span>
            </div>
          </div>

          {/* Enhanced CTAs */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={
                process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                "https://chrome.google.com/webstore"
              }
              target="_blank"
              className="group"
            >
              <Button size="lg" className="gap-3 pr-8 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Install Chrome Extension</span>
                </div>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="#how-it-works" className="group">
              <Button variant="outline" size="lg" className="gap-2 group-hover:bg-primary-50 dark:group-hover:bg-primary-950">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free forever plan
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Setup in 30 seconds
            </span>
          </div>
        </div>

        {/* Enhanced hero illustration */}
        <div className="mt-20 mx-auto max-w-6xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl" />
            
            {/* Main demo container */}
            <div className="relative rounded-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm p-8 shadow-2xl dark:border-gray-700/50 dark:bg-gray-900/90">
              {/* Browser chrome */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center px-3">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      cookiepass.app/s/demo123
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              {/* Demo content */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center shadow-lg">
                    <Image
                      src="/logo.svg"
                      alt="CookiePass"
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                      Someone shared Netflix access with you
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        netflix.com
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Expires in 23 hours
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        4 uses remaining
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center px-4">
                    <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-gray-400">
                      Enter share password...
                    </span>
                  </div>
                  <div className="h-12 px-6 rounded-lg bg-gradient-to-r from-primary-500 to-indigo-500 text-white flex items-center text-sm font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    Import Access
                    <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Success state preview */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Session imported successfully!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    You're now logged into Netflix. Opening in new tab...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}