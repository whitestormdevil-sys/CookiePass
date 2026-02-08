const useCases = [
  {
    title: "Share Netflix with Family",
    description: "Give family members access to your streaming accounts without sharing passwords. Set time limits and revoke access anytime.",
    icon: "🎬",
    tags: ["Personal", "Entertainment"],
    example: "Share Netflix for the weekend while you're traveling",
    stats: "Most popular use case"
  },
  {
    title: "Team Testing Accounts",
    description: "Share development and staging environment access with your team. Perfect for QA testing without creating multiple accounts.",
    icon: "🧪",
    tags: ["Development", "Testing"],
    example: "Give QA team temporary access to staging environments",
    stats: "Used by 500+ dev teams"
  },
  {
    title: "Client Demos & Presentations",
    description: "Show clients your work in progress without sharing credentials. Give them temporary access to preview environments.",
    icon: "📊",
    tags: ["Business", "Sales"],
    example: "Let clients preview their website before launch",
    stats: "Perfect for agencies"
  },
  {
    title: "Virtual Assistant Access",
    description: "Give your VA temporary access to manage social media, customer support, or other online tasks securely.",
    icon: "👥",
    tags: ["Business", "Productivity"],
    example: "VA manages your social media for the week",
    stats: "Trusted by remote teams"
  },
  {
    title: "Emergency Access Sharing",
    description: "When you're locked out or unavailable, quickly share access with trusted friends or family members.",
    icon: "🆘",
    tags: ["Emergency", "Personal"],
    example: "Friend helps manage your online store while you're sick",
    stats: "Peace of mind feature"
  },
  {
    title: "Training & Onboarding",
    description: "Give new team members temporary access to learn systems and processes. Perfect for training without permanent accounts.",
    icon: "🎓",
    tags: ["Education", "Training"],
    example: "New employee learns the system with limited access",
    stats: "Reduces onboarding time"
  }
];

const benefits = [
  {
    icon: "🔒",
    title: "No Password Sharing",
    description: "Keep your actual passwords private and secure"
  },
  {
    icon: "⏰",
    title: "Time-Limited",
    description: "Access expires automatically when you want it to"
  },
  {
    icon: "🔄",
    title: "Instantly Revocable",
    description: "Cancel access immediately if needed"
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    description: "Any website, any browser, any device"
  }
];

export function UseCases() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Use Cases
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Perfect for{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              every scenario
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            From personal sharing to enterprise workflows, CookiePass adapts to your needs
            while keeping security at the forefront.
          </p>
        </div>

        {/* Benefits strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary-200 dark:border-gray-700/50 dark:bg-gray-900/80 dark:hover:border-primary-800"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{useCase.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {useCase.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full px-2 py-1">
                    {useCase.stats}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {useCase.description}
                </p>

                {/* Example */}
                <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                      <svg className="h-3 w-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Example scenario:
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        "{useCase.example}"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-950/50 dark:to-indigo-950/50 rounded-3xl p-8 border border-primary-200/50 dark:border-primary-800/50">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Have a different use case?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              CookiePass works with any website that uses cookies for authentication.
              If you can log in with cookies, you can share it with CookiePass.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                E-commerce platforms
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Social media
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                SaaS tools
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Development tools
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                And much more...
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}