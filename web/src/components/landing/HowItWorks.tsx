import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    {
      number: "01",
      title: "Share Your Session",
      description: "Install our extension and share any logged-in website with one click.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
    },
    {
      number: "02", 
      title: "Secure Encryption",
      description: "Your session data is encrypted with AES-256 before transmission.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Recipient Access",
      description: "Recipients import the session with a password and get instant access.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-indigo-600 mb-4">How It Works</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Share access in three simple steps
          </h2>
          <p className="text-lg text-gray-600">
            Our secure process ensures your credentials stay private while sharing access.
          </p>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-gray-300 to-transparent transform translate-x-6" />
                )}
                
                {/* Step card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-100 text-indigo-600 mb-6 mx-auto">
                    {step.icon}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-semibold text-indigo-600 mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}