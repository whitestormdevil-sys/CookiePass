import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function UseCases() {
  const { ref, isVisible } = useScrollAnimation();

  const useCases = [
    {
      title: "Share streaming services",
      description: "Give family and friends access to Netflix, Disney+, Hulu, and other streaming platforms without sharing your actual passwords.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 9a1 1 0 001 1h12a1 1 0 001-1L17 4M9 9h6M9 13h6" />
        </svg>
      ),
      benefits: ["Family plan sharing", "No password exposure", "Revoke anytime"],
    },
    {
      title: "Temporary team access",
      description: "Provide contractors, freelancers, or temporary staff access to internal tools and platforms with automatic expiration.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      benefits: ["Time-limited access", "No account creation", "Complete audit trail"],
    },
    {
      title: "Client demonstrations",
      description: "Show your products and services to clients by sharing access to admin panels, dashboards, or demo environments.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      benefits: ["Secure demos", "Usage tracking", "Professional impression"],
    },
    {
      title: "Virtual assistant access",
      description: "Grant your VA or support team temporary access to manage your accounts without compromising your login credentials.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      benefits: ["Delegate safely", "Monitor activity", "Instant revocation"],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-indigo-600 mb-4">Use Cases</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Built for real-world sharing
          </h2>
          <p className="text-lg text-gray-600">
            From personal use to enterprise scenarios, CookiePass adapts to your needs.
          </p>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div 
                key={useCase.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 card-hover"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                  {useCase.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-7">
                  {useCase.description}
                </p>
                
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}