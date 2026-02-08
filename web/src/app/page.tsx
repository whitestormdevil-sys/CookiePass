"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { UseCases } from "@/components/landing/UseCases";
import { Security } from "@/components/landing/Security";
import { Stats } from "@/components/landing/Stats";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="CookiePass" width={24} height={24} />
            <span className="text-lg font-bold text-gray-900">
              CookiePass
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-1">
          <Link
            href="#features"
            className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            FAQ
          </Link>
          <hr className="my-4 border-gray-200" />
          <Link
            href="/auth/login"
            className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-base font-medium text-white hover:bg-indigo-700"
            onClick={onClose}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900">
              CookiePass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden rounded-lg p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Features />
        <UseCases />
        <Security />
        <Stats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}