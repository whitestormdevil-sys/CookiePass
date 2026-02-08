# 🍪 CookiePass

**Share access to any website without sharing your password — securely, temporarily, and revocably.**

CookiePass lets you securely share browser sessions (cookies) with others using end-to-end encryption, expiration controls, and usage limits.

## Features

- 🔐 **End-to-end encrypted** cookie sharing
- ⏰ **Auto-expiring** share links (1h to 7 days)
- 🔢 **Usage limits** (1 to unlimited uses)
- 🚫 **Revocable** — revoke access anytime
- 🌐 **Domain blocklist** — prevents sharing sensitive sites (banking, etc.)
- 🎨 **Dark/Light/System** theme support
- 🔒 **Password protected** shares
- 📊 **Share tracking** — see who imported your shares

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  Chrome Extension │────▶│  Express API  │────▶│   MongoDB    │
│  (React + Vite)  │     │  (TypeScript) │     │              │
└─────────────────┘     └──────────────┘     └──────────────┘
                              │
                        ┌──────────────┐
                        │  Web Portal   │
                        │  (Next.js 14) │
                        └──────────────┘
```

### Components

| Component | Stack | Location |
|-----------|-------|----------|
| Chrome Extension | React, TypeScript, Tailwind, Vite + CRXJS (MV3) | `extension/` |
| Backend API | Express, TypeScript, Mongoose, JWT | `api/` |
| Web Portal | Next.js 14, TypeScript, Tailwind | `web/` |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+
- Chrome 102+

### Setup

```bash
# Clone
git clone https://github.com/whitestormdevil-sys/CookiePass.git
cd CookiePass

# API
cd api && npm install && cp .env.example .env
npm run dev

# Extension
cd ../extension && npm install && cp .env.example .env
npm run build
# Load extension/dist as unpacked in chrome://extensions

# Web Portal
cd ../web && npm install && cp .env.example .env
npm run dev
```

### Environment Variables

**API** (`api/.env`):
- `PORT` — Server port (default: 3001)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `CORS_ORIGINS` — Allowed origins (comma-separated)

**Extension** (`extension/.env`):
- `VITE_API_BASE_URL` — API URL (default: http://localhost:3001)
- `VITE_APP_URL` — Web portal URL (default: http://localhost:3000)

**Web** (`web/.env`):
- `NEXT_PUBLIC_API_URL` — API URL

## Tiers

| Feature | Free | Pro | Team |
|---------|------|-----|------|
| Shares/month | 10 | Unlimited | Unlimited |
| Max expiration | 168h | 30 days | 30 days |
| Max uses/share | 5 | Unlimited | Unlimited |
| Password protection | ✅ | ✅ | ✅ |
| localStorage sharing | ❌ | ✅ | ✅ |
| Team management | ❌ | ❌ | ✅ |

## License

GPLv3 — See [LICENSE](LICENSE) for details.
