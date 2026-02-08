import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Security() {
  const { ref, isVisible } = useScrollAnimation();

  const securityPoints = [
    {
      title: "Zero-Knowledge Architecture",
      description: "We never see your passwords or session data in plaintext. Everything is encrypted on your device before transmission.",
    },
    {
      title: "Client-Side Encryption",
      description: "All encryption and decryption happens in your browser using industry-standard AES-256 encryption.",
    },
    {
      title: "Open Source & Auditable",
      description: "Our entire codebase is open source and available for security audits by the community.",
    },
    {
      title: "No Plaintext Storage",
      description: "We only store encrypted data. Even if our servers were compromised, your data would remain secure.",
    },
  ];

  return (
    <section id="security" className="py-24 sm:py-32 bg-gradient-to-br from-slate-50 to-gray-100 bg-grid relative">
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <p className="text-section-label text-green-600 mb-4">Security</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Security at every step
          </h2>
          <p className="text-lg text-gray-600">
            Your data is protected by military-grade encryption throughout the entire process.
          </p>
        </div>

        {/* Security flow diagram with enhanced animations */}
        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''} mb-20`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 glass backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-green-200/50 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50" />
            
            {/* Step 1: Your Browser */}
            <div className="flex flex-col items-center text-center z-10 animate-fade-in-up stagger-1">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg animate-pulse-slow">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Browser</h3>
              <p className="text-sm text-gray-600 max-w-xs">Session data collected securely</p>
            </div>

            {/* Animated Arrow 1 */}
            <div className="flex items-center z-10">
              <div className="relative">
                <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-green-300 rounded-full blur-sm animate-ping opacity-20" />
              </div>
            </div>

            {/* Step 2: AES-256 Encrypt */}
            <div className="flex flex-col items-center text-center z-10 animate-fade-in-up stagger-2">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AES-256 Encrypt</h3>
              <p className="text-sm text-gray-600 max-w-xs">Military-grade encryption applied</p>
            </div>

            {/* Animated Arrow 2 */}
            <div className="flex items-center z-10">
              <div className="relative">
                <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90 animate-pulse-slow" style={{ animationDelay: '0.3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-green-300 rounded-full blur-sm animate-ping opacity-20" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>

            {/* Step 3: Encrypted Storage */}
            <div className="flex flex-col items-center text-center z-10 animate-fade-in-up stagger-3">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg animate-pulse-slow" style={{ animationDelay: '1s' }}>
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Encrypted Storage</h3>
              <p className="text-sm text-gray-600 max-w-xs">Safely stored on our servers</p>
            </div>

            {/* Animated Arrow 3 */}
            <div className="flex items-center z-10">
              <div className="relative">
                <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90 animate-pulse-slow" style={{ animationDelay: '0.6s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-green-300 rounded-full blur-sm animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>

            {/* Step 4: Recipient Decrypts */}
            <div className="flex flex-col items-center text-center z-10 animate-fade-in-up stagger-4">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg animate-pulse-slow" style={{ animationDelay: '1.5s' }}>
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.586l4.707-4.707A6 6 0 0115 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recipient Decrypts</h3>
              <p className="text-sm text-gray-600 max-w-xs">Unlocked with share password</p>
            </div>

            {/* Animated Arrow 4 */}
            <div className="flex items-center z-10">
              <div className="relative">
                <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90 animate-pulse-slow" style={{ animationDelay: '0.9s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-green-300 rounded-full blur-sm animate-ping opacity-20" style={{ animationDelay: '0.9s' }} />
              </div>
            </div>

            {/* Step 5: Their Browser */}
            <div className="flex flex-col items-center text-center z-10 animate-fade-in-up stagger-5">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg animate-pulse-slow" style={{ animationDelay: '2s' }}>
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Their Browser</h3>
              <p className="text-sm text-gray-600 max-w-xs">Session imported and ready</p>
            </div>
          </div>
        </div>

        {/* Security points grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityPoints.map((point, index) => (
            <div 
              key={point.title} 
              className={`glass backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 hover-lift-indigo animate-fade-in-up stagger-${index + 1}`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-3">
                <div className="h-2 w-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse" />
                {point.title}
              </h3>
              <p className="text-gray-600 leading-7">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}