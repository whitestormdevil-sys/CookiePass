import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Animated mesh/orbs in background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/10 blob blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-white/30 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        {/* Shimmer effect across section */}
        <div className="absolute inset-0 shimmer opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to share access{" "}
            <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
              securely?
            </span>
          </h2>
          <p className="text-xl text-indigo-100 mb-8 animate-fade-in-up stagger-1">
            Get started in under 30 seconds. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
            <Link
              href={
                process.env.NEXT_PUBLIC_CHROME_STORE_URL ||
                "https://chrome.google.com/webstore"
              }
              target="_blank"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto glass bg-white/90 text-indigo-600 border-white/30 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                Install Free Extension
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/30 glass backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-indigo-100 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass bg-white/10 backdrop-blur-sm">
              <svg className="h-4 w-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free forever plan
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass bg-white/10 backdrop-blur-sm">
              <svg className="h-4 w-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              14-day Pro trial
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass bg-white/10 backdrop-blur-sm">
              <svg className="h-4 w-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}