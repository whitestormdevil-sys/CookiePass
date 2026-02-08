const steps = [
  {
    step: "01",
    title: "Select & Export",
    description:
      "Browse to any website, click the CookiePass extension, and select which cookies to share. Our smart detection identifies the right session cookies automatically.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
    features: ["Smart cookie detection", "One-click export", "Privacy-first filtering"]
  },
  {
    step: "02",
    title: "Encrypt & Share",
    description:
      "Set a password, expiration time, and usage limits. CookiePass encrypts everything with AES-256 and generates a unique share link that expires when you want it to.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    features: ["AES-256 encryption", "Time-based expiration", "Usage limits"]
  },
  {
    step: "03",
    title: "Import & Access",
    description:
      "The recipient opens the link, enters the password, and CookiePass imports the session cookies directly into their browser. Instant access — no password sharing needed.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
    features: ["One-click import", "Instant access", "No passwords exposed"]
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white dark:bg-gray-950/30"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            How It Works
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Three simple steps to{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              secure sharing
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            No complicated setup. No password sharing. No security risks.
            Just simple, secure access sharing that works everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative group">
              {/* Animated connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-px -translate-x-1/2 z-0">
                  <div className="h-full bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent animate-gradient-x bg-[length:200%_auto]" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                </div>
              )}
              
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 dark:border-gray-700/50 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-800 group-hover:-translate-y-1">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-indigo-500 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-indigo-100 text-primary-600 dark:from-primary-900/40 dark:to-indigo-900/40 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                    {step.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-900/30 px-6 py-3 text-sm text-primary-700 dark:text-primary-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Ready to get started? Install the extension and try it in seconds!</span>
          </div>
        </div>
      </div>
    </section>
  );
}