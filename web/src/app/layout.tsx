import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "CookiePass — Share Website Access Without Sharing Passwords",
    template: "%s | CookiePass",
  },
  description:
    "Securely share website sessions with anyone. Time-limited, revocable, AES-256 encrypted. No passwords exposed, ever.",
  keywords: [
    "share website access without password",
    "secure session sharing",
    "cookie sharing",
    "session sharing",
    "share login",
    "temporary access",
    "CookiePass",
  ],
  authors: [{ name: "CookiePass" }],
  openGraph: {
    title: "CookiePass — Share Website Access Without Sharing Passwords",
    description:
      "Securely share website sessions with anyone. Time-limited, revocable, and encrypted end-to-end.",
    url: "https://cookiepass.app",
    siteName: "CookiePass",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CookiePass - Secure Session Sharing",
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
