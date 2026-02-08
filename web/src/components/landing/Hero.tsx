import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] py-28 sm:py-36 overflow-hidden bg-white">
      <style>{`
        @keyframes morph1 {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes morph2 {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%; }
          50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        @keyframes morph3 {
          0%, 100% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          50% { border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(0px); }
          50% { transform: perspective(1200px) rotateY(-6deg) rotateX(2deg) translateY(-20px); }
        }
        @keyframes float-element {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 blur-3xl opacity-30"
        style={{ animation: 'morph1 8s ease-in-out infinite' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 blur-3xl opacity-30"
        style={{ animation: 'morph2 10s ease-in-out infinite' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-violet-300 to-purple-300 blur-3xl opacity-30"
        style={{ animation: 'morph3 12s ease-in-out infinite' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-emerald-50 border border-emerald-200">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium text-emerald-800">AES-256 Encrypted</span>
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-blue-50 border border-blue-200">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-sm font-medium text-blue-800">Open Source</span>
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-violet-50 border border-violet-200">
                <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium text-violet-800">Zero Knowledge</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-gray-900">Share website access</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                without sharing passwords
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
              Securely share session cookies and login states with your team. 
              CookiePass encrypts your credentials and generates shareable links that expire automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://chrome.google.com/webstore" 
                target="_blank"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-[0_0_40px_-10px_rgba(102,99,242,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                Add to Chrome
              </Link>
              
              <Link 
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/60 backdrop-blur-xl border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-white/80 transition-all"
              >
                How it works
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div 
              className="relative animate-[float_6s_ease-in-out_infinite]"
              style={{ transform: 'perspective(1200px) rotateY(-6deg) rotateX(2deg)' }}
            >
              <div className="rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden bg-white">
                <div className="bg-gray-100 flex items-center px-4 h-11 border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  
                  <div className="bg-white rounded-lg h-7 flex-1 mx-4 flex items-center px-3 shadow-sm border border-gray-200/50">
                    <svg className="w-3.5 h-3.5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs text-gray-500 font-medium">cookiepass.app/import/abc123</span>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <h3 className="text-lg font-semibold text-gray-900">Import Netflix Access</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        netflix.com
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Expires in 24h
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Encrypted Session Token</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        readOnly 
                        value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-mono focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Import Session
                  </button>

                  <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-800">Successfully imported Netflix session</span>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl"
                style={{ animation: 'float-element 4s ease-in-out infinite' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10,000+</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">sessions shared</div>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-lg flex items-center gap-2"
                style={{ animation: 'float-element 5s ease-in-out infinite 1s' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
