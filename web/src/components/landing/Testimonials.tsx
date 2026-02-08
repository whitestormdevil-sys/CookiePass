'use client'

import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    quote: "CookiePass saved us hours of credential management. Our team shares tool access without any security risks.",
    author: "Sarah Chen",
    role: "Engineering Lead, TechCorp",
    initials: "SC",
    gradient: "from-blue-500 to-indigo-600",
    rotation: "lg:-rotate-1"
  },
  {
    quote: "Finally, a secure way to share streaming accounts with family. The auto-expiry feature gives me peace of mind.",
    author: "Mike Johnson",
    role: "Software Developer",
    initials: "MJ",
    gradient: "from-emerald-500 to-teal-600",
    rotation: "lg:rotate-0"
  },
  {
    quote: "We use CookiePass for client handoffs. The encryption and audit trail make it perfect for agency work.",
    author: "Priya Patel",
    role: "Agency Owner, DigitalFirst",
    initials: "PP",
    gradient: "from-purple-500 to-violet-600",
    rotation: "lg:rotate-1"
  }
]

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: '-50px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Loved by teams and individuals
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`
                bg-white rounded-3xl p-8 border border-gray-200 shadow-sm
                hover:-translate-y-1 hover:shadow-lg transition-all duration-500 ease-out
                ${testimonial.rotation}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient}
                  flex items-center justify-center text-white font-semibold text-sm flex-shrink-0
                `}>
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
