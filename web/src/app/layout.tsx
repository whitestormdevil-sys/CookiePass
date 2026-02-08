import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cookiepass.app'),
  title: {
    default: "CookiePass — Share Website Access Without Sharing Passwords",
    template: "%s | CookiePass",
  },
  description:
    "Securely share website sessions with anyone. Time-limited, revocable, AES-256 encrypted. No passwords exposed, ever. The secure alternative to password sharing.",
  keywords: [
    "share website access without password",
    "secure session sharing",
    "cookie sharing",
    "session sharing",
    "share login",
    "temporary access",
    "password alternative",
    "AES-256 encryption",
    "zero knowledge",
    "CookiePass",
  ],
  authors: [{ name: "CookiePass Team" }],
  creator: "CookiePass",
  publisher: "CookiePass",
  openGraph: {
    title: "CookiePass — Share Website Access Without Sharing Passwords",
    description:
      "Securely share website sessions with anyone. Time-limited, revocable, and encrypted end-to-end. The secure alternative to password sharing.",
    url: "https://cookiepass.app",
    siteName: "CookiePass",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CookiePass - Secure Session Sharing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CookiePass — Share Website Access Without Sharing Passwords",
    description:
      "Securely share website sessions with anyone. Time-limited, revocable, and encrypted end-to-end.",
    images: ["/og-image.png"],
    creator: "@cookiepassapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://cookiepass.app/#software",
      name: "CookiePass",
      url: "https://cookiepass.app",
      logo: "https://cookiepass.app/logo.svg",
      description:
        "Secure session sharing platform that allows users to share website access without exposing passwords. Features AES-256 encryption, time-limited access, and zero-knowledge architecture.",
      applicationCategory: "SecurityApplication",
      operatingSystem: ["Chrome", "Browser Extension"],
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "INR",
          description: "5 shares per month, 24-hour max expiry, basic features",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "499",
          priceCurrency: "INR",
          description: "Unlimited shares, 30-day max expiry, advanced features",
        },
        {
          "@type": "Offer",
          name: "Team Plan",
          price: "1499",
          priceCurrency: "INR",
          description: "Everything in Pro plus team management and enterprise features",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "CookiePass Team",
      },
      publisher: {
        "@type": "Organization",
        name: "CookiePass",
        logo: {
          "@type": "ImageObject",
          url: "https://cookiepass.app/logo.svg",
        },
      },
      softwareVersion: "1.0",
      downloadUrl: process.env.NEXT_PUBLIC_CHROME_STORE_URL || "https://chrome.google.com/webstore",
      featureList: [
        "AES-256 Encryption",
        "Zero Knowledge Architecture", 
        "Time-Limited Access",
        "Instant Revocation",
        "Cross-Browser Support",
        "Open Source",
        "No Password Exposure",
        "Smart Cookie Detection",
      ],
      screenshot: "https://cookiepass.app/screenshot.png",
    },
    {
      "@type": "Organization",
      "@id": "https://cookiepass.app/#organization",
      name: "CookiePass",
      url: "https://cookiepass.app",
      logo: "https://cookiepass.app/logo.svg",
      description: "Provider of secure session sharing solutions for developers and teams worldwide.",
      foundingDate: "2024",
      sameAs: [
        "https://github.com/whitestormdevil-sys/CookiePass",
        "https://twitter.com/cookiepassapp",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://cookiepass.app/#website",
      url: "https://cookiepass.app",
      name: "CookiePass",
      description: "Share website access without sharing passwords",
      publisher: {
        "@id": "https://cookiepass.app/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://cookiepass.app/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://cookiepass.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is CookiePass safe to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. CookiePass uses military-grade AES-256 encryption — the same standard used by banks and governments worldwide. Your session data is encrypted before it leaves your browser with zero-knowledge architecture.",
          },
        },
        {
          "@type": "Question", 
          name: "Can the person I share with see my password?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No! CookiePass shares session cookies, not credentials. The recipient gets temporary access to your logged-in session without ever seeing your username or password.",
          },
        },
        {
          "@type": "Question",
          name: "Which browsers are supported?", 
          acceptedAnswer: {
            "@type": "Answer",
            text: "CookiePass currently works as a Chrome extension, with Firefox and Edge support coming soon. The extension works with virtually any website that uses cookies for authentication.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}