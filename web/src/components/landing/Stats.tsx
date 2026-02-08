"use client";

import { useEffect, useState } from "react";

const stats = [
  {
    number: "50,000+",
    label: "Sessions Shared",
    description: "Secure session shares created by our users",
    icon: "🔄",
    color: "from-blue-500 to-indigo-500"
  },
  {
    number: "10,000+",
    label: "Active Users",
    description: "Trusted by developers and teams worldwide",
    icon: "👥",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "99.9%",
    label: "Success Rate",
    description: "Reliable sharing with industry-leading uptime",
    icon: "✅",
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "0",
    label: "Data Breaches",
    description: "Zero security incidents since launch",
    icon: "🛡️",
    color: "from-red-500 to-orange-500"
  }
];

const achievements = [
  {
    icon: "🏆",
    title: "Product Hunt",
    description: "Featured Product of the Day",
    badge: "#1"
  },
  {
    icon: "⭐",
    title: "Chrome Web Store",
    description: "4.8/5 star rating from users",
    badge: "4.8★"
  },
  {
    icon: "🚀",
    title: "GitHub",
    description: "Open source with 500+ stars",
    badge: "500+"
  },
  {
    icon: "💼",
    title: "Enterprise",
    description: "Used by 100+ companies",
    badge: "100+"
  }
];

function CountUpNumber({ target, duration = 2000 }: { target: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, '')) || 0;
  
  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericTarget);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [numericTarget, duration]);

  if (target.includes('%')) {
    return <>{count}%</>;
  } else if (target.includes('+')) {
    return <>{count.toLocaleString()}+</>;
  } else {
    return <>{count.toLocaleString()}</>;
  }
}

export function Stats() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-24 bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-primary-950/30 dark:via-gray-900 dark:to-indigo-950/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
            By The Numbers
          </h2>
          <h3 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              thousands
            </span>{" "}
            worldwide
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Join a growing community of developers, teams, and businesses 
            who trust CookiePass for secure session sharing.
          </p>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:shadow-2xl hover:border-primary-200 dark:border-gray-700/50 dark:bg-gray-900/80 dark:hover:border-primary-800 group-hover:-translate-y-1">
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {inView ? <CountUpNumber target={stat.number} /> : "0"}
                </div>
                
                {/* Label */}
                <div className="font-semibold text-gray-900 dark:text-white mb-3">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recognition & Achievements
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              CookiePass has been recognized by the community and industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {achievement.badge}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth chart visualization */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Growing Every Day
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Users trust CookiePass more every month
            </p>
          </div>
          
          <div className="flex items-end justify-center gap-2 h-32">
            {[20, 35, 28, 45, 55, 42, 65, 78, 70, 85, 90, 100].map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-primary-500 to-indigo-500 rounded-t-sm min-w-[20px] transition-all duration-1000 hover:opacity-80"
                style={{
                  height: inView ? `${height}%` : '0%',
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Monthly active users over the last year
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-full px-8 py-4 border border-green-200/50 dark:border-green-800/50">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-indigo-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-green-700 dark:text-green-400">
              <span className="font-medium">Join thousands of users</span>
              <span className="text-green-600 dark:text-green-500"> who trust CookiePass daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}