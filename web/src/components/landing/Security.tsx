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
    <section id="security" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <p className="text-section-label text-green-600 mb-4">Security</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Security at every step
          </h2>
          <p className="text-lg text-gray-600">
            Your data is protected by military-grade encryption throughout the entire process.
          </p>
        </div>

        {/* Security flow diagram */}
        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''} mb-20`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 border border-green-100">
            {/* Step 1: Your Browser */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Browser</h3>
              <p className="text-sm text-gray-600 max-w-xs">Session data collected securely</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 2: AES-256 Encrypt */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-green-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AES-256 Encrypt</h3>
              <p className="text-sm text-gray-600 max-w-xs">Military-grade encryption applied</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 3: Encrypted Storage */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Encrypted Storage</h3>
              <p className="text-sm text-gray-600 max-w-xs">Safely stored on our servers</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 4: Recipient Decrypts */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-orange-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.586l4.707-4.707A6 6 0 0115 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recipient Decrypts</h3>
              <p className="text-sm text-gray-600 max-w-xs">Unlocked with share password</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <svg className="h-6 w-8 text-green-500 transform lg:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 5: Their Browser */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Their Browser</h3>
              <p className="text-sm text-gray-600 max-w-xs">Session imported and ready</p>
            </div>
          </div>
        </div>

        {/* Security points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityPoints.map((point) => (
            <div key={point.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
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