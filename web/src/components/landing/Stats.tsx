'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  id: string
  value: number | string
  suffix: string
  label: string
  color: string
  shouldCount: boolean
}

const stats: Stat[] = [
  {
    id: 'sessions',
    value: 10000,
    suffix: '+',
    label: 'sessions shared',
    color: 'text-indigo-600',
    shouldCount: true,
  },
  {
    id: 'encryption',
    value: '256-bit',
    suffix: '',
    label: 'encryption',
    color: 'text-emerald-600',
    shouldCount: false,
  },
  {
    id: 'uptime',
    value: '99.9%',
    suffix: '',
    label: 'uptime',
    color: 'text-blue-600',
    shouldCount: false,
  },
  {
    id: 'websites',
    value: 50,
    suffix: '+',
    label: 'supported websites tested',
    color: 'text-purple-600',
    shouldCount: true,
  },
]

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<string, number>>({
    sessions: 0,
    websites: 0,
  })
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const rafIds = useRef<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000

    stats.forEach((stat) => {
      if (stat.shouldCount && typeof stat.value === 'number') {
        const startTime = performance.now()
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const current = Math.floor((stat.value as number) * easeOutQuart)
          
          setCounts((prev) => ({
            ...prev,
            [stat.id]: current,
          }))
          
          if (progress < 1) {
            const rafId = requestAnimationFrame(animate)
            rafIds.current.push(rafId)
          }
        }
        
        const rafId = requestAnimationFrame(animate)
        rafIds.current.push(rafId)
      }
    })

    return () => {
      rafIds.current.forEach(id => cancelAnimationFrame(id))
      rafIds.current = []
    }
  }, [isVisible])

  const formatValue = (stat: Stat) => {
    if (!stat.shouldCount) return stat.value
    const num = counts[stat.id]
    return num.toLocaleString()
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
            BY THE NUMBERS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by thousands worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`
                bg-white rounded-2xl p-8 border border-gray-100 shadow-sm
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                {formatValue(stat)}
                {stat.suffix}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
