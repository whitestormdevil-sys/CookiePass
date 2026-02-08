const comparisonData = {
  headers: ["Feature", "CookiePass", "Password Sharing", "Password Managers", "Screen Sharing"],
  rows: [
    {
      feature: "Security",
      cookiepass: { value: "AES-256 Encrypted", status: "excellent" as StatusType },
      passwords: { value: "Password Exposed", status: "poor" as StatusType },
      managers: { value: "Vault Protected", status: "good" as StatusType },
      screen: { value: "Visual Only", status: "fair" as StatusType }
    },
    {
      feature: "Setup Time",
      cookiepass: { value: "30 seconds", status: "excellent" as StatusType },
      passwords: { value: "Instant", status: "good" as StatusType },
      managers: { value: "5-10 minutes", status: "fair" as StatusType },
      screen: { value: "2-3 minutes", status: "good" as StatusType }
    },
    {
      feature: "Access Control",
      cookiepass: { value: "Time & Usage Limits", status: "excellent" as StatusType },
      passwords: { value: "No Control", status: "poor" as StatusType },
      managers: { value: "Permission Based", status: "good" as StatusType },
      screen: { value: "Session Based", status: "fair" as StatusType }
    },
    {
      feature: "Password Privacy",
      cookiepass: { value: "Never Shared", status: "excellent" as StatusType },
      passwords: { value: "Fully Exposed", status: "poor" as StatusType },
      managers: { value: "Encrypted Storage", status: "good" as StatusType },
      screen: { value: "Not Visible", status: "excellent" as StatusType }
    },
    {
      feature: "Remote Access",
      cookiepass: { value: "Full Independence", status: "excellent" as StatusType },
      passwords: { value: "Full Independence", status: "good" as StatusType },
      managers: { value: "Full Independence", status: "good" as StatusType },
      screen: { value: "Requires Presence", status: "poor" as StatusType }
    },
    {
      feature: "Bandwidth Usage",
      cookiepass: { value: "Minimal", status: "excellent" as StatusType },
      passwords: { value: "None", status: "excellent" as StatusType },
      managers: { value: "Low", status: "good" as StatusType },
      screen: { value: "High", status: "poor" as StatusType }
    },
    {
      feature: "Mobile Friendly",
      cookiepass: { value: "Yes", status: "excellent" as StatusType },
      passwords: { value: "Yes", status: "good" as StatusType },
      managers: { value: "Limited", status: "fair" as StatusType },
      screen: { value: "Poor", status: "poor" as StatusType }
    },
    {
      feature: "Instant Revocation",
      cookiepass: { value: "Yes", status: "excellent" as StatusType },
      passwords: { value: "Change Password", status: "fair" as StatusType },
      managers: { value: "Remove Access", status: "good" as StatusType },
      screen: { value: "End Session", status: "good" as StatusType }
    }
  ]
};

type StatusType = "excellent" | "good" | "fair" | "poor";

const statusColors: Record<StatusType, { bg: string; text: string; border: string; icon: string }> = {
  excellent: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    icon: "✅"
  },
  good: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    icon: "👍"
  },
  fair: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "⚠️"
  },
  poor: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    icon: "❌"
  }
};

const alternatives = [
  {
    name: "Password Sharing",
    problems: [
      "Passwords exposed in plain text",
      "No expiration control",
      "Can't revoke access without changing password",
      "Security risk if password is compromised"
    ],
    icon: "🔓"
  },
  {
    name: "Password Managers",
    problems: [
      "Requires shared vault setup",
      "Monthly subscription costs",
      "Complex permission management",
      "Still shares actual credentials"
    ],
    icon: "🗝️"
  },
  {
    name: "Screen Sharing",
    problems: [
      "Requires both parties to be present",
      "High bandwidth usage",
      "Poor mobile experience",
      "Can't work independently"
    ],
    icon: "📺"
  }
];

export function Comparison() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            Comparison
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              CookiePass
            </span>{" "}
            is better
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Compare CookiePass with traditional methods of sharing access. 
            See why it's the most secure and convenient solution.
          </p>
        </div>

        {/* Problems with alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {alternatives.map((alt, index) => (
            <div
              key={index}
              className="rounded-2xl border border-red-200/50 bg-red-50/30 dark:border-red-800/50 dark:bg-red-900/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{alt.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {alt.name}
                </h4>
              </div>
              <ul className="space-y-2">
                {alt.problems.map((problem, problemIndex) => (
                  <li key={problemIndex} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                    <span className="text-red-500 mt-1">×</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed comparison table */}
        <div className="bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8 pb-0">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Feature Comparison
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                See how CookiePass stacks up against other solutions
              </p>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-t border-gray-200/50 dark:border-gray-700/50">
                  {comparisonData.headers.map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left text-sm font-semibold ${
                        index === 0
                          ? "text-gray-900 dark:text-white"
                          : index === 1
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-t border-gray-200/50 dark:border-gray-700/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 bg-primary-50/50 dark:bg-primary-900/20">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${statusColors[row.cookiepass.status].bg} ${statusColors[row.cookiepass.status].text} ${statusColors[row.cookiepass.status].border}`}>
                        <span>{statusColors[row.cookiepass.status].icon}</span>
                        <span>{row.cookiepass.value}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${statusColors[row.passwords.status].bg} ${statusColors[row.passwords.status].text} ${statusColors[row.passwords.status].border}`}>
                        <span>{statusColors[row.passwords.status].icon}</span>
                        <span>{row.passwords.value}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${statusColors[row.managers.status].bg} ${statusColors[row.managers.status].text} ${statusColors[row.managers.status].border}`}>
                        <span>{statusColors[row.managers.status].icon}</span>
                        <span>{row.managers.value}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${statusColors[row.screen.status].bg} ${statusColors[row.screen.status].text} ${statusColors[row.screen.status].border}`}>
                        <span>{statusColors[row.screen.status].icon}</span>
                        <span>{row.screen.value}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden p-6 space-y-6">
            {comparisonData.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30 p-4"
              >
                <h5 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {row.feature}
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">CookiePass</span>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.cookiepass.status].bg} ${statusColors[row.cookiepass.status].text}`}>
                      <span>{statusColors[row.cookiepass.status].icon}</span>
                      <span>{row.cookiepass.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Passwords</span>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.passwords.status].bg} ${statusColors[row.passwords.status].text}`}>
                      <span>{statusColors[row.passwords.status].icon}</span>
                      <span>{row.passwords.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Managers</span>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.managers.status].bg} ${statusColors[row.managers.status].text}`}>
                      <span>{statusColors[row.managers.status].icon}</span>
                      <span>{row.managers.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Screen Share</span>
                    <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.screen.status].bg} ${statusColors[row.screen.status].text}`}>
                      <span>{statusColors[row.screen.status].icon}</span>
                      <span>{row.screen.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-950/50 dark:to-indigo-950/50 rounded-3xl p-8 border border-primary-200/50 dark:border-primary-800/50">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to switch to the better way?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who've made the switch to secure, convenient session sharing.
              Install CookiePass and see the difference immediately.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-second setup
              </span>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free forever plan
              </span>
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}