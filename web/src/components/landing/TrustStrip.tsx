'use client'

import React from 'react'

const companies = [
  'Netflix',
  'GitHub',
  'Spotify',
  'Amazon',
  'Google',
  'Slack',
  'Notion',
  'Figma',
  'Discord',
  'YouTube',
]

export function TrustStrip() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <p className="text-center text-sm text-gray-500 uppercase tracking-wider font-medium">
        Trusted by teams who value security
      </p>
      
      <div className="mt-8 overflow-hidden">
        <div className="flex items-center gap-8 w-max animate-marquee">
          {[...companies, ...companies].map((company, idx) => (
            <React.Fragment key={`${company}-${idx}`}>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-gray-200" />
                </div>
                <span className="text-gray-400 font-semibold text-lg whitespace-nowrap">
                  {company}
                </span>
              </div>
              <span className="text-gray-300 text-lg select-none" aria-hidden="true">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
