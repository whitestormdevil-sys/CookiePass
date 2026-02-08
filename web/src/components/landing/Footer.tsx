import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Security", href: "#security" },
      { name: "Pricing", href: "#pricing" },
      { name: "Chrome Extension", href: process.env.NEXT_PUBLIC_CHROME_STORE_URL || "#" },
    ],
    support: [
      { name: "Documentation", href: "/docs" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact Us", href: "/contact" },
      { name: "Status", href: "/status" },
      { name: "Report Bug", href: "https://github.com/whitestormdevil-sys/CookiePass/issues" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Data Processing", href: "/data" },
    ],
    developers: [
      { name: "API Documentation", href: "/api/docs" },
      { name: "GitHub", href: "https://github.com/whitestormdevil-sys/CookiePass" },
      { name: "Open Source", href: "/open-source" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/whitestormdevil-sys/CookiePass",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/cookiepass",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/cookiepass",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900" />
      
      {/* Subtle top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="p-1 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-105 transition-transform">
                <Image src="/logo.svg" alt="CookiePass" width={28} height={28} className="invert" />
              </div>
              <span className="text-xl font-bold">CookiePass</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Securely share website access without sharing passwords. 
              Military-grade encryption for peace of mind.
            </p>
            
            {/* Social links with hover glow */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/20 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.name}</span>
                  <div className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter with enhanced styling */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Stay Updated
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="h-1 w-1 bg-indigo-500 rounded-full" />
              Product
            </h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="h-1 w-1 bg-emerald-500 rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="h-1 w-1 bg-orange-500 rounded-full" />
              Legal
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="h-1 w-1 bg-purple-500 rounded-full" />
              Developers
            </h3>
            <ul className="space-y-3">
              {navigation.developers.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    target={item.href.startsWith('http') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with enhanced gradient */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>© 2026 CookiePass. All rights reserved.</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-green-500/10 border border-orange-500/20">
              <span>Made in India</span>
              <span className="text-orange-500 animate-pulse">🇮🇳</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-400 hover:text-white transition-colors hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-400 hover:text-white transition-colors hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-slate-400 hover:text-white transition-colors hover:underline"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}