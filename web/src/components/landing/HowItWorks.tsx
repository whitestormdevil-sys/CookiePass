"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HowItWorks() {
  const containerRef = useScrollReveal();

  const steps = [
    {
      number: "1",
      title: "Share Your Session",
      description: "Install our extension and share any logged-in website with one click. No passwords needed.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Secure Encryption",
      description: "Your session data is encrypted with AES-256 before transmission. Zero-knowledge security.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Import & Access",
      description: "Recipients import the session with a password and get instant access. Time-limited and revocable.",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="section-label">How It Works</div>
          <h2 className="section-heading">
            Share access in three simple steps
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our secure process ensures your credentials stay private while sharing access seamlessly.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex-1 max-w-sm">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 left-full w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)' }} />
                )}

                {/* Large step number background */}
                <div className="absolute top-8 left-8 text-[120px] font-bold opacity-5 text-gray-900 pointer-events-none select-none leading-none">
                  {step.number}
                </div>

                {/* Step card */}
                <div 
                  className={`reveal delay-${index + 1} relative z-10 ${step.bgColor} rounded-3xl p-8 shadow-lg card-lift border-gradient ${index === 1 ? 'lg:-translate-y-4' : ''}`}
                >
                  {/* Icon circle */}
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center ${step.iconColor} shadow-md mb-6 mx-auto`}>
                    {step.icon}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                      Step {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
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