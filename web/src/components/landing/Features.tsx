import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Features() {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation();
  const { ref: ref4, isVisible: isVisible4 } = useScrollAnimation();

  const mainFeatures = [
    {
      title: "Military-Grade Encryption",
      description: "Every session is protected with AES-256 encryption, the same standard used by governments and financial institutions. Your data remains secure throughout the entire sharing process.",
      visual: (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-green-800">Your Data</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-16 bg-green-300 rounded animate-pulse" />
              <span className="text-xs text-green-700">AES-256</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-green-800">Protected</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Full Control Over Access",
      description: "Set expiration times, usage limits, and revoke access instantly. Monitor all shared sessions from your centralized dashboard with detailed logs and activity tracking.",
      visual: (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Netflix Share</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>⏰ 18h remaining</span>
                <span>👥 3/5 uses</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">GitHub Access</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Expired</span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>⏰ Expired 2h ago</span>
                <span>👥 5/5 uses</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "One-Click Import",
      description: "Recipients simply click a link and enter the share password. No account creation required. Sessions are imported instantly and opened in a new tab.",
      visual: (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Click Share Link
              </div>
            </div>
            <div className="flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <input
                type="password"
                placeholder="Enter share password..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                readOnly
              />
              <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded font-medium text-sm">
                Import & Open
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Complete Audit Trail",
      description: "Track every access attempt, successful imports, and usage patterns. Export detailed logs for compliance and security reviews with timestamps and IP addresses.",
      visual: (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-gray-600">12:34 PM - Session imported by john@company.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-gray-600">11:45 AM - Share link accessed from 192.168.1.100</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-gray-600">10:30 AM - Share created for netflix.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-gray-600">09:15 AM - Extension installed and activated</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const smallFeatures = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Time Limits",
      description: "Set automatic expiration from 1 hour to 30 days",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Usage Limits",
      description: "Control how many times a share can be used",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Instant Revoke",
      description: "Cancel access immediately from your dashboard",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.586l4.707-4.707A6 6 0 0115 7z" />
        </svg>
      ),
      title: "Notifications",
      description: "Get alerts when your shares are accessed",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Analytics",
      description: "Track usage patterns and access attempts",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Ready",
      description: "Access and manage shares from any device",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <p className="text-section-label text-indigo-600 mb-4">Features</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Everything you need to share securely
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed for both personal users and enterprise teams.
          </p>
        </div>

        {/* Main alternating features */}
        <div className="space-y-32">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              ref={index === 0 ? ref1 : index === 1 ? ref2 : index === 2 ? ref3 : ref4}
              className={`animate-on-scroll ${
                index === 0 && isVisible1 ? 'visible' : 
                index === 1 && isVisible2 ? 'visible' : 
                index === 2 && isVisible3 ? 'visible' :
                index === 3 && isVisible4 ? 'visible' : ''
              }`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-8">
                    {feature.description}
                  </p>
                </div>
                
                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  {feature.visual}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small features grid - now BENTO GRID! */}
        <div className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* Time Limits - spans 2 cols */}
            <div className="md:col-span-2 glass backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Time Limits
              </h3>
              <p className="text-gray-600 text-lg">
                Set automatic expiration from 1 hour to 30 days
              </p>
            </div>

            {/* Usage Limits - regular size */}
            <div className="glass backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Usage Limits
              </h3>
              <p className="text-gray-600">
                Control how many times a share can be used
              </p>
            </div>

            {/* Instant Revoke - regular size */}
            <div className="glass backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Revoke
              </h3>
              <p className="text-gray-600">
                Cancel access immediately from your dashboard
              </p>
            </div>

            {/* Notifications - spans 2 cols */}
            <div className="md:col-span-2 glass backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.586l4.707-4.707A6 6 0 0115 7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Notifications
              </h3>
              <p className="text-gray-600 text-lg">
                Get alerts when your shares are accessed
              </p>
            </div>

            {/* Analytics - tall card */}
            <div className="md:row-span-2 glass backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group flex flex-col">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analytics
              </h3>
              <p className="text-gray-600 flex-grow">
                Track usage patterns and access attempts with detailed insights
              </p>
            </div>

            {/* Mobile Ready - regular size */}
            <div className="glass backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:gradient-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Ready
              </h3>
              <p className="text-gray-600">
                Access and manage shares from any device
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}