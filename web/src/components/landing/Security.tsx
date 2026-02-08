'use client'

import React, { useEffect, useRef, useState } from 'react'

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
)

export function Security() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: LockIcon,
      title: "AES-256 Encryption",
      description: "Military-grade encryption protects every credential with the same standard used by governments worldwide.",
      color: "text-indigo-400"
    },
    {
      icon: EyeOffIcon,
      title: "Zero-Knowledge Architecture",
      description: "Your master password never leaves your device. We cannot access, reset, or recover your data—ever.",
      color: "text-emerald-400"
    },
    {
      icon: ShieldIcon,
      title: "Client-Side Encryption",
      description: "All encryption happens locally in your browser before any data touches our servers.",
      color: "text-blue-400"
    },
    {
      icon: ClockIcon,
      title: "Auto-Expiring Sessions",
      description: "Sessions automatically lock after periods of inactivity, ensuring your vault stays secure.",
      color: "text-amber-400"
    }
  ]

  const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <div 
      className={`transform transition-all duration-700 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )

  return (
    <section ref={sectionRef} className="py-28 sm:py-32 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-950 to-gray-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <FadeIn>
              <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">
                Security
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Security that never compromises
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-xl">
                Your data deserves fortress-level protection. We built CookiePass with security-first architecture that puts you in complete control.
              </p>
            </FadeIn>

            <div className="space-y-0">
              {features.map((feature, index) => (
                <FadeIn key={feature.title} delay={100 + (index * 100)}>
                  <div className={`flex gap-4 py-6 ${index !== features.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative flex flex-col items-center space-y-2 max-w-sm mx-auto lg:max-w-none">
              <FadeIn delay={200} className="w-full">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex-1 h-6 bg-white/5 rounded-md flex items-center px-3">
                      <span className="text-xs text-gray-500 font-mono">cookiepass.com</span>
                    </div>
                  </div>
                  <div className="space-y-2 p-2">
                    <div className="h-2 bg-white/10 rounded w-3/4" />
                    <div className="h-2 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/5 flex items-center gap-2">
                    <LockIcon className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-gray-400">Encrypting locally...</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300} className="h-12 w-full flex justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center">
                  <div className="w-px h-full bg-gradient-to-b from-white/20 to-indigo-500/50" />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <div className="absolute w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                </div>
              </FadeIn>

              <FadeIn delay={400} className="w-full">
                <div className="bg-indigo-500/20 rounded-2xl p-5 border border-indigo-500/30 backdrop-blur-sm shadow-[0_0_60px_-15px_rgba(102,99,242,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-50" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <LockIcon className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-indigo-100">AES-256 Encrypted</div>
                      <div className="text-xs text-indigo-300/70">End-to-end protection</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1.5 flex-1 bg-indigo-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-400/60 rounded-full"
                          style={{ 
                            width: '40%',
                            animation: `shimmer 2s infinite`,
                            animationDelay: `${i * 0.15}s`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={500} className="h-12 w-full flex justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center">
                  <div className="w-px h-full bg-gradient-to-b from-indigo-500/50 to-white/20" />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <div className="absolute w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                </div>
              </FadeIn>

              <FadeIn delay={600} className="w-full">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <ServerIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-white">CookiePass Server</div>
                      <div className="text-xs text-gray-500">Encrypted blob only</div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-500 italic">We never see your data in plaintext</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
