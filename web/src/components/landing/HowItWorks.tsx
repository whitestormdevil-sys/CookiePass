'use client'

import { useEffect, useRef } from 'react'

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8')
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cards = sectionRef.current?.querySelectorAll('.step-card')
    cards?.forEach((card, index) => {
      ;(card as HTMLElement).style.transitionDelay = `${index * 150}ms`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-28 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-block text-indigo-600 font-semibold text-sm tracking-wider uppercase mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Share access in three simple steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our secure process ensures your credentials stay private while sharing access.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Dashed connectors */}
          <div className="hidden lg:block absolute top-[80px] left-[33%] w-[calc(33%-3rem)] border-t-2 border-dashed border-gray-300 z-0" />
          <div className="hidden lg:block absolute top-[80px] right-[33%] w-[calc(33%-3rem)] border-t-2 border-dashed border-gray-300 z-0" />

          {/* Step 1 - Share */}
          <div className="step-card relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="absolute top-0 right-4 text-[120px] font-bold text-blue-900 opacity-[0.04] leading-none select-none pointer-events-none z-0">01</div>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Session</h3>
              <p className="text-gray-600 leading-relaxed">
                Install the extension and share any logged-in website with one click. A secure, encrypted link is generated instantly.
              </p>
            </div>
          </div>

          {/* Step 2 - Encrypt */}
          <div className="step-card relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="absolute top-0 right-4 text-[120px] font-bold text-purple-900 opacity-[0.04] leading-none select-none pointer-events-none z-0">02</div>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl lg:-translate-y-4 z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Encryption</h3>
              <p className="text-gray-600 leading-relaxed">
                Your session data is encrypted with AES-256 before leaving your browser. We never see your data in plaintext.
              </p>
            </div>
          </div>

          {/* Step 3 - Import */}
          <div className="step-card relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="absolute top-0 right-4 text-[120px] font-bold text-emerald-900 opacity-[0.04] leading-none select-none pointer-events-none z-0">03</div>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recipient Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Recipients enter the share password and get instant access. No account needed. Sessions import in one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
