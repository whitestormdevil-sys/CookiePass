import Link from "next/link";
import { Button } from "@/components/ui/Button";

const stats = [
  { number: "10,000+", label: "Active Users" },
  { number: "50,000+", label: "Sessions Shared" },
  { number: "Zero", label: "Security Incidents" },
  { number: "4.8★", label: "Chrome Store Rating" }
];

export function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 px-8 py-20 sm:px-16 sm:py-28 text-center">
          {/* Enhanced decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-0 h-48 w-48 rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
            <div className="absolute top-1/3 right-0 h-56 w-56 rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEw0MCAwTDQwIDQwTDAgNDBMMCAwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30" />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white mb-8">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get started in 30 seconds
            </div>

            {/* Main headline */}
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Ready to revolutionize
              <br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                how you share access?
              </span>
            </h2>
            
            {/* Subheading */}
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers, agencies, and teams who've made the switch to secure session sharing. 
              No more password exposure, no more security risks.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={
                  process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                  "https://chrome.google.com/webstore"
                }
                target="_blank"
                className="group"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50 focus:ring-white shadow-2xl group-hover:shadow-3xl group-hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Install Chrome Extension</span>
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Button>
              </Link>
              
              <Link href="/auth/register" className="group">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold group-hover:border-white/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Create Account</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free forever plan
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-second setup
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% open source
              </span>
            </div>

            {/* Final message */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-2xl mx-auto">
              <p className="text-white font-medium text-lg mb-2">
                🎉 Special Launch Offer
              </p>
              <p className="text-blue-100">
                Get started today and receive 6 months of Pro features free when you upgrade within your first 30 days. 
                Limited time only!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom testimonial */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center text-xl font-bold">
                  SC
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                  "CookiePass completely transformed our development workflow. We went from sharing passwords in Slack to secure, time-limited access shares. Our security audit team was impressed."
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">DevOps Engineer at TechFlow Inc</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}