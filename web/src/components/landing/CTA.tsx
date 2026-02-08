import Link from 'next/link'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-24 sm:py-32">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_2s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
      <div className="absolute top-40 right-1/3 w-3 h-3 bg-white/20 rounded-full" />
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-white/20 rounded-full" />
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/20 rounded-full" />
      <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white/20 rounded-full" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to share access securely?
        </h2>
        <p className="text-xl text-indigo-100 mb-10">
          Get started in under 30 seconds. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="https://chromewebstore.google.com/detail/cookiepass" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/90 text-indigo-600 rounded-2xl px-8 py-4 font-semibold hover:bg-white hover:scale-[1.02] shadow-lg transition-all duration-200 text-center"
          >
            Install Free Extension
          </Link>
          
          <Link 
            href="/auth/register" 
            className="w-full sm:w-auto bg-white/20 border border-white/30 backdrop-blur-xl text-white rounded-2xl px-8 py-4 font-semibold hover:bg-white/30 hover:scale-[1.02] shadow-lg transition-all duration-200 text-center"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-sm font-medium">Free forever plan</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-sm font-medium">14-day Pro trial</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-sm font-medium">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
