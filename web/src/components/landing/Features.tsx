const features = [
  {
    title: "AES-256 Encryption",
    description: "Military-grade encryption protects every shared session. Only the intended recipient with the correct password can decrypt it.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "No Password Exposure",
    description: "Never share your actual passwords. CookiePass shares temporary session access while keeping your credentials private.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Time-Limited Access",
    description: "Set expiration times from 1 hour to 30 days. Shared sessions automatically expire, ensuring access is always temporary.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-orange-500 to-red-500"
  },
  {
    title: "One-Click Import",
    description: "Recipients get instant access with a single click. No complex setup, no browser configuration, just simple and fast.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Instant Revocation",
    description: "Changed your mind? Revoke any shared session instantly. The recipient loses access immediately, even before expiration.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Password Protected Shares",
    description: "Every share is protected with a password you set. Even if someone finds the link, they can't access without the password.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Smart Cookie Detection",
    description: "CookiePass intelligently identifies which cookies are needed for a valid session, so you don't have to guess.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Usage Limits",
    description: "Control how many times a shared session can be imported. Set limits from 1 use to unlimited based on your needs.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-teal-500 to-cyan-500"
  },
  {
    title: "Cross-Browser Support",
    description: "Share sessions across different browsers and devices. Chrome today, with Firefox and Edge support coming soon.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Full Audit Trail",
    description: "Track every import: when, where, and from which browser. Complete visibility into who accessed your shared sessions.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: "from-slate-500 to-gray-500"
  },
];

const featuredFeatures = [
  {
    title: "Zero Knowledge Architecture",
    description: "We can't see your data even if we wanted to. All encryption and decryption happens on your device. Our servers only store encrypted blobs.",
    icon: "🔐",
    stats: "100% client-side encryption"
  },
  {
    title: "Enterprise-Grade Security",
    description: "The same encryption technology trusted by banks and governments. AES-256 with secure key derivation and zero data retention.",
    icon: "🛡️",
    stats: "Military-grade AES-256"
  },
  {
    title: "Open Source & Auditable",
    description: "Every line of code is public and auditable. No black boxes, no hidden backdoors, just transparent security you can verify yourself.",
    icon: "🔍",
    stats: "100% open source"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/30 dark:bg-gray-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Features
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Security-first{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              session sharing
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Every feature designed with privacy and security at its core.
            No compromises, no backdoors, no data collection.
          </p>
        </div>

        {/* Featured features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {featuredFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 dark:border-gray-700/50 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-800">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  {feature.stats}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All features grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-200/50 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-900/60 dark:hover:border-primary-800"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white transition-transform group-hover:scale-110 duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500/10 to-indigo-500/10 border border-primary-200 dark:border-primary-800 px-6 py-3 text-sm text-primary-700 dark:text-primary-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>All features included in the free plan — no paid tiers for security!</span>
          </div>
        </div>
      </div>
    </section>
  );
}