"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  isVisible: boolean;
}

function AnimatedCounter({ end, suffix = "", prefix = "", isVisible }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const duration = 2000; // 2 seconds
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return (
    <span className="animate-count-up">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    {
      number: 10000,
      suffix: "+",
      label: "Sessions shared",
      description: "Users trust us with their access",
      color: "from-indigo-600 to-purple-600",
    },
    {
      number: 256,
      suffix: "-bit",
      label: "Encryption",
      description: "Military-grade security standard",
      color: "from-purple-600 to-pink-600",
    },
    {
      number: 0,
      label: "Data breaches",
      description: "Perfect security track record",
      color: "from-emerald-600 to-teal-600",
    },
    {
      number: 100,
      suffix: "%",
      label: "Open source",
      description: "Transparent and auditable code",
      color: "from-blue-600 to-indigo-600",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 gradient-mesh-1 relative">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-300/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-indigo-200/30 blob blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-section-label text-slate-600 mb-4">Trusted Worldwide</p>
          <h2 className="text-section-heading font-semibold text-gray-900 mb-6">
            Powering secure sharing globally
          </h2>
        </div>

        <div 
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`text-center glass backdrop-blur-xl rounded-2xl p-8 hover-lift-indigo animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2 relative">
                  {stat.label}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 h-0.5 w-8 bg-gradient-to-r ${stat.color} rounded-full`} />
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}