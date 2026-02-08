'use client'

import { useEffect, useRef, useState } from 'react'

export function UseCases() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const useCases = [
    {
      title: 'Share Netflix, Disney+, Hulu access',
      description: 'Let family members use streaming accounts without sharing passwords. Secure, temporary access that expires automatically when no longer needed.',
      gradient: 'from-red-100 to-orange-100',
      border: 'border-red-200',
      iconBg: 'bg-red-500',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 10l4 2-4 2v-4z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Give team members tool access',
      description: 'Share access to development tools, SaaS platforms, and dashboards without exposing credentials. Perfect for agencies and remote teams.',
      gradient: 'from-blue-100 to-indigo-100',
      border: 'border-blue-200',
      iconBg: 'bg-blue-500',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Share client account access securely',
      description: 'Freelancers and agencies can provide managed access to client accounts without revealing login details. Maintain security while delivering work.',
      gradient: 'from-emerald-100 to-teal-100',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-500',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Delegate without exposing credentials',
      description: 'Give virtual assistants access to specific accounts without sharing passwords. Revoke access instantly when tasks are complete.',
      gradient: 'from-purple-100 to-violet-100',
      border: 'border-purple-200',
      iconBg: 'bg-purple-500',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <section ref={sectionRef} className="py-28 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Use Cases</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built for every sharing scenario
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Securely share access to any account without compromising your credentials. Perfect for teams, families, and professionals.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={`group relative rounded-3xl border p-8 bg-gradient-to-br ${useCase.gradient} ${useCase.border} transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${useCase.iconBg} shadow-sm`}>
                {useCase.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {useCase.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
