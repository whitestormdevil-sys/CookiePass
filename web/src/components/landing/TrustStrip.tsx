"use client";

import { useEffect, useRef } from "react";

const websites = [
  { name: "Netflix", icon: "🎬" },
  { name: "GitHub", icon: "🐱" },
  { name: "Spotify", icon: "🎵" },
  { name: "Amazon", icon: "📦" },
  { name: "Discord", icon: "💬" },
  { name: "LinkedIn", icon: "💼" },
  { name: "Facebook", icon: "📘" },
  { name: "Twitter", icon: "🐦" },
  { name: "Instagram", icon: "📷" },
  { name: "YouTube", icon: "📺" },
  { name: "Gmail", icon: "📧" },
  { name: "Slack", icon: "💻" },
  { name: "Dropbox", icon: "☁️" },
  { name: "Notion", icon: "📝" },
  { name: "Figma", icon: "🎨" },
];

export function TrustStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scroll = () => {
      scrollAmount += 0.5;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scroll, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 border-y border-gray-200/50 dark:border-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Works with any website
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share access to any website that uses cookies for authentication.
            From streaming services to work tools, CookiePass works everywhere.
          </p>
        </div>

        {/* Scrolling website icons */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* First set */}
            {websites.map((site, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group min-w-[120px]"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {site.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {site.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless scroll */}
            {websites.map((site, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group min-w-[120px]"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {site.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {site.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/50 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50/50 to-transparent dark:from-gray-900/50 pointer-events-none" />
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              10,000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Supported websites
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              50,000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sessions shared
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              99.9%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Success rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}