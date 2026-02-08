const securityFeatures = [
  {
    icon: "🔐",
    title: "Client-Side Encryption",
    description: "All encryption happens in your browser. We never see your unencrypted data."
  },
  {
    icon: "🔑",
    title: "AES-256 Standard",
    description: "Military-grade encryption used by banks and governments worldwide."
  },
  {
    icon: "🛡️",
    title: "Zero Knowledge",
    description: "Even if our servers were compromised, your data remains safe."
  },
  {
    icon: "🔍",
    title: "Open Source",
    description: "Every line of code is auditable. No hidden backdoors or vulnerabilities."
  }
];

const encryptionSteps = [
  {
    step: 1,
    title: "Export",
    description: "Cookies are exported from your browser",
    detail: "Session cookies are identified and extracted using browser APIs",
    icon: "📤"
  },
  {
    step: 2,
    title: "Encrypt",
    description: "Data is encrypted with your password",
    detail: "AES-256-GCM encryption with PBKDF2 key derivation (100k iterations)",
    icon: "🔒"
  },
  {
    step: 3,
    title: "Store",
    description: "Encrypted blob is stored on our servers",
    detail: "Only the encrypted data is transmitted - we can't decrypt it",
    icon: "☁️"
  },
  {
    step: 4,
    title: "Decrypt",
    description: "Recipient decrypts with the password",
    detail: "Decryption happens entirely in the recipient's browser",
    icon: "🔓"
  },
  {
    step: 5,
    title: "Import",
    description: "Cookies are imported to recipient's browser",
    detail: "Session is restored and the user is automatically logged in",
    icon: "📥"
  }
];

const securitySpecs = [
  {
    label: "Encryption Algorithm",
    value: "AES-256-GCM",
    description: "Advanced Encryption Standard with 256-bit keys"
  },
  {
    label: "Key Derivation",
    value: "PBKDF2",
    description: "100,000 iterations with random salt"
  },
  {
    label: "Data Retention",
    value: "Time-limited",
    description: "Automatically deleted after expiration"
  },
  {
    label: "Zero Knowledge",
    value: "Enabled",
    description: "We can't access your unencrypted data"
  }
];

export function Security() {
  return (
    <section id="security" className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Security
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              Military-grade encryption
            </span>{" "}
            meets zero-knowledge privacy
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            We've built CookiePass with the highest security standards. 
            Your data is encrypted before it leaves your browser and we can never decrypt it.
          </p>
        </div>

        {/* Security features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 dark:bg-gray-900/60 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Encryption flow diagram */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How Encryption Works
            </h4>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every step designed to protect your privacy. From export to import, 
              your data is always encrypted and never exposed.
            </p>
          </div>

          <div className="relative">
            {/* Desktop flow */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between">
                {encryptionSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    {/* Connection line */}
                    {index < encryptionSteps.length - 1 && (
                      <div className="absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary-400 to-primary-600 z-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-500" />
                      </div>
                    )}
                    
                    {/* Step circle */}
                    <div className="relative z-10 h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-4">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="text-center max-w-[200px]">
                      <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                        STEP {step.step}
                      </div>
                      <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile flow */}
            <div className="lg:hidden space-y-8">
              {encryptionSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 text-white flex items-center justify-center text-lg shadow-lg">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                      STEP {step.step}
                    </div>
                    <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security specifications */}
        <div className="bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Industry-standard cryptographic implementations with zero compromises
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {securitySpecs.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="font-mono text-lg font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {spec.value}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                  {spec.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {spec.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-full px-8 py-4 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Zero data breaches</span>
            </div>
            <div className="h-4 w-px bg-green-300 dark:bg-green-700" />
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">100% open source</span>
            </div>
            <div className="h-4 w-px bg-green-300 dark:bg-green-700" />
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Auditable code</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}