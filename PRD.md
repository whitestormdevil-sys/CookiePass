# CookiePass — Product Requirements Document

**Version:** 1.0  
**Author:** [Product Owner]  
**Date:** February 2026  
**Status:** Pre-Launch / MVP Development

---

## 1. Overview

### 1.1 Product Vision

CookiePass is a Chrome browser extension that enables secure, controlled sharing of authenticated web sessions between users. It eliminates the need to share passwords by allowing users to share temporary, encrypted, revocable access to any web application with one click.

### 1.2 One-Line Pitch

> "Share access to any website without sharing your password — securely, temporarily, and revocably."

### 1.3 Background & Motivation

Today, teams routinely share credentials through insecure channels — Slack messages, shared spreadsheets, or password manager vaults. These methods are either insecure (plaintext passwords floating around), permanent (no easy revocation), or expensive (paying for extra seats on SaaS tools when only occasional access is needed). There is no lightweight, secure tool purpose-built for sharing *session access* rather than *credentials*.

CookiePass addresses this gap by operating at the session layer — sharing encrypted authentication cookies instead of passwords — giving owners full control over duration, usage limits, and revocation.

---

## 2. Problem Statement

### 2.1 Core Problems

**P1 — Insecure credential sharing:** Teams share passwords over chat, email, and docs. These credentials are permanent, untracked, and impossible to revoke without changing the password for everyone.

**P2 — Expensive multi-seat licenses:** Agencies and small teams pay for full SaaS seats (SEMrush, Ahrefs, HubSpot, etc.) when only 1–2 people need daily access and others need occasional access.

**P3 — Painful access handoffs:** Giving clients, freelancers, or contractors temporary access to dashboards and tools requires creating accounts, managing permissions, or doing screen shares — all time-consuming.

**P4 — Difficult bug reproduction:** Developers and QA engineers waste hours on screen shares trying to reproduce bugs that only appear in specific authenticated states.

### 2.2 Why Existing Solutions Fail

| Method | Failure Mode |
|---|---|
| Share password via chat | Insecure, permanent, no audit trail, no revocation |
| Password manager shared vaults | Still shares the actual credential; can't time-limit |
| Create a new user account | Slow, often requires a paid seat, admin overhead |
| Screen share | Both parties must be online; view-only, can't interact |
| Email magic links | Only works for simple actions, not full session access |

### 2.3 Market Opportunity

- **TAM:** $4.2B (password management + access management)
- **SAM:** $800M (SMBs needing lightweight access sharing)
- **SOM:** $10M (early adopters — agencies, dev teams, freelancers)
- **Competitive landscape:** Near-zero legitimate, polished competitors. Existing tools are either security-questionable, developer-only CLI tools, or lack any UI/UX polish.

---

## 3. Target Users

### 3.1 Primary Personas

**Agency Alex** — Digital marketing agency owner (5–15 people). Paying for multiple SaaS seats when only a few people need full-time access. Willing to spend ₹2,000–5,000/month on tools that save license costs. Found on LinkedIn, Twitter, marketing forums.

**Freelancer Priya** — Web developer/designer. Needs to give clients access to staging sites and dashboards without exposing master credentials. Budget: ₹500–1,000/month. Found on Upwork, freelancer communities, Reddit.

**DevOps Dev** — Developer or QA engineer. Needs to reproduce bugs in authenticated states and share test accounts across environments. Company expense budget: ₹1,000–3,000/month. Found on GitHub, Stack Overflow, Hacker News.

### 3.2 Secondary Personas

- Startup CTOs managing team access without enterprise SSO
- Content creators sharing tool access with virtual assistants
- IT administrators providing temporary contractor access

### 3.3 Anti-Personas (Explicitly Out of Scope)

- Casual consumers sharing streaming accounts (too price-sensitive, ToS concerns)
- Enterprises with SSO/SCIM infrastructure (already solved)
- Highly regulated industries — banking, healthcare (compliance complexity too high for MVP)

---

## 4. Goals & Success Metrics

### 4.1 North Star Metric

**Weekly Active Sharers (WAS)** — users who created at least one share in the past 7 days.

### 4.2 Key Results (12-Month Targets)

| Metric | M1 | M3 | M6 | M12 |
|---|---|---|---|---|
| Total installs | 1,000 | 5,000 | 15,000 | 50,000 |
| Weekly Active Sharers | 100 | 500 | 1,500 | 5,000 |
| Shares created (cumulative) | 500 | 3,000 | 10,000 | 40,000 |
| Import success rate | 90% | 92% | 95% | 95% |
| Free → Pro conversion | 1% | 2% | 3% | 4% |
| MRR | ₹2.5K | ₹18K | ₹52K | ₹1.4L |
| NPS | 30 | 40 | 50 | 60 |

### 4.3 Key Events to Track

`extension_installed`, `share_created`, `share_imported`, `share_revoked`, `upgrade_clicked`, `upgrade_completed`

---

## 5. User Stories & Requirements

### 5.1 Epic 1: Cookie Export & Share Creation

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-1.1 | As an owner, I want to see all cookies for the current site so I can choose what to share. | P0 | Extension popup lists all cookies for the active tab's domain, grouped by type (auth, analytics, other). |
| US-1.2 | As an owner, I want auth cookies auto-detected and pre-selected so I don't have to guess which ones matter. | P0 | Smart detection highlights session/auth cookies using name heuristics (e.g., `SESS*`, `auth_token`, `jwt`, `sid`). |
| US-1.3 | As an owner, I want to set an expiration time for the share so access is automatically time-limited. | P0 | Options: 1 hour, 6 hours, 24 hours, 7 days. (30 days for Pro.) |
| US-1.4 | As an owner, I want to set a use limit so I control how many times the share can be imported. | P0 | Options: 1, 3, 5, 10, unlimited (Pro). |
| US-1.5 | As an owner, I want the share encrypted with a password so only the intended recipient can decrypt it. | P0 | AES-256-GCM encryption with PBKDF2 key derivation. Auto-generated memorable password (e.g., `autumn-tiger-92`) with option for custom. |
| US-1.6 | As an owner, I want a shareable link and password generated so I can send them to the recipient. | P0 | Short URL (`cookiepass.io/s/xxxxx`) + password displayed with copy buttons. Security tip shown: "Send link and password via different channels." |
| US-1.7 | As an owner, I want blocked domains (banking, email, government) to be prevented from sharing. | P0 | Domain blocklist regex checked before share creation. Clear error message shown. |

### 5.2 Epic 2: Cookie Import

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-2.1 | As a recipient, I want to paste a share link and password to import access. | P0 | Import tab accepts link + password. Validates share exists, not expired, not revoked, uses remaining. |
| US-2.2 | As a recipient, I want to see what I'm importing before it happens so I can confirm. | P0 | Pre-import confirmation screen shows: domain, number of cookies, sharer identity, expiry. |
| US-2.3 | As a recipient, I want cookies set in my browser and the site opened automatically. | P0 | All cookies set via `chrome.cookies.set()`. Target site opens in new tab. |
| US-2.4 | As a recipient, I want clear feedback if the import fails (expired, revoked, wrong password). | P0 | Specific error messages for each failure mode. |

### 5.3 Epic 3: Share Management & Revocation

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-3.1 | As an owner, I want to see a list of all my active and past shares. | P0 | "My Shares" tab shows shares with domain, status (active/expired/revoked), creation date, import count. |
| US-3.2 | As an owner, I want to revoke a share instantly so no new imports are possible. | P0 | "Revoke" button marks share as revoked server-side. Subsequent import attempts return 410. |
| US-3.3 | As an owner, I want a guided "logout everywhere" instruction after revoking so I can fully terminate access. | P1 | Post-revocation screen shows service-specific instructions (e.g., "Go to SEMrush → Settings → Security → Sign out all devices") with a direct link. |
| US-3.4 | As an owner, I want to see who imported my share and when. | P1 | Import log shows: timestamp, approximate location (country), browser. IP stored as hash only. |

### 5.4 Epic 4: User Accounts & Subscription

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-4.1 | As a user, I want to create an account with email/password so my shares persist across devices. | P0 | Registration and login via Supabase Auth. JWT-based session. |
| US-4.2 | As a free user, I want to create up to 3 shares/month with 24-hour max expiration. | P0 | Server enforces limits. Clear UI showing remaining shares. |
| US-4.3 | As a user, I want to upgrade to Pro for unlimited shares and extended features. | P1 | Checkout flow via Lemon Squeezy. Subscription status reflected immediately in extension. |
| US-4.4 | As a user, I want to cancel my subscription and retain access until the billing period ends. | P1 | Cancel via dashboard. Access continues until `subscription_expires_at`. |

### 5.5 Epic 5: Onboarding

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-5.1 | As a first-time user, I want a guided walkthrough so I understand how to create my first share. | P1 | 3-step onboarding: (1) navigate to a logged-in site, (2) select cookies, (3) create share. Tooltip-based guidance. |
| US-5.2 | As a recipient who doesn't have the extension, I want the share link page to prompt me to install it. | P0 | `cookiepass.io/s/xxxxx` landing page detects if extension is installed. If not, shows install CTA. |

### 5.6 Epic 6: Pro Features (v1.5)

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-6.1 | As a Pro user, I want to include localStorage/sessionStorage data in my share. | P2 | Content script extracts storage data. Included in encrypted payload. Set on import. |
| US-6.2 | As a Pro user, I want webhook notifications when my share is imported. | P2 | Configurable webhook URL per share. POST request on import with share ID, timestamp, country. |
| US-6.3 | As a Pro user, I want custom branding on my share page. | P2 | Upload logo. Share page shows custom branding instead of CookiePass default. |

### 5.7 Epic 7: Team Features (v2.0)

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-7.1 | As a team admin, I want a centralized workspace to manage all team shares. | P3 | Team dashboard showing all shares created by team members. |
| US-7.2 | As a team admin, I want role-based access (Admin, Member, Viewer). | P3 | Permissions enforced on all team actions. |
| US-7.3 | As a team admin, I want complete audit logs exportable for compliance. | P3 | CSV/JSON export of all share and import activity. |
| US-7.4 | As a team admin, I want to set domain allowlists/blocklists for my team. | P3 | Team-level domain rules that override defaults. |
| US-7.5 | As a team admin, I want SSO integration (Google Workspace, Okta). | P3 | SAML/OIDC login flow. |
| US-7.6 | As a developer on a team, I want API access to programmatically create shares. | P3 | REST API with API key authentication for Team tier. |

---

## 6. How It Works (Core Flow)

**Step 1 — Owner selects what to share:** Owner is logged into a website, opens the CookiePass popup, and sees cookies categorized by type. Auth cookies are auto-detected and pre-selected.

**Step 2 — Owner configures share settings:** Owner chooses expiration (1h to 30 days), use limits (1 to unlimited), and password (auto-generated or custom).

**Step 3 — Client-side encryption:** Selected cookies are encrypted with AES-256-GCM using PBKDF2-derived key from the password. Only the encrypted blob is sent to the server. The server never sees plaintext cookies.

**Step 4 — Share link generated:** Server stores encrypted blob and returns a short URL (`cookiepass.io/s/xxxxx`). Owner sends link and password to recipient (ideally via separate channels).

**Step 5 — Recipient imports:** Recipient opens extension, enters link + password. Extension fetches encrypted blob, decrypts client-side, and sets cookies via `chrome.cookies.set()`. Target site opens automatically.

**Step 6 — Access expires or is revoked:** Share auto-expires per configured duration. Owner can revoke anytime. Post-revocation guidance helps owner "logout everywhere" on the target service.

---

## 7. Security Requirements

### 7.1 Encryption

- AES-256-GCM encryption for all cookie data
- PBKDF2 key derivation with 100,000 iterations, SHA-256
- Random 16-byte salt and 12-byte IV per share
- All encryption/decryption happens client-side — the server never holds plaintext

### 7.2 Access Control

- Password-protected share links
- Time-based auto-expiration with server-side enforcement
- Use-count limits enforced server-side
- Instant owner revocation (prevents new imports)

### 7.3 Pre-Share Protections

- Domain blocklist (banking, email, government, healthcare, cryptocurrency, password managers)
- Sensitive domain warnings before share creation
- Rate limiting: max 10 shares/day (free), 100/day (pro)
- Explicit user confirmation required (no auto-export)

### 7.4 Audit & Monitoring

- Import logging with timestamp, IP hash (SHA-256, not raw IP), user agent, country
- Anomaly detection (multiple IPs flagged)
- Optional webhook notifications on import

### 7.5 Known Limitations (Transparent to Users)

These are disclosed in the UI and documentation:

- Cannot force-delete cookies from a recipient's browser after import (browser security model limitation)
- Cannot prevent screenshots or credential extraction from password fields
- Some sites may detect session sharing via IP/fingerprint changes
- Revocation stops new imports but cannot guarantee deletion of already-imported cookies unless the recipient also has the extension

---

## 8. Technical Architecture

### 8.1 Stack

| Layer | Technology | Rationale |
|---|---|---|
| Extension | TypeScript, Chrome Extension APIs (MV3) | Native cookie access, full HttpOnly support |
| Extension UI | React + Tailwind CSS | Fast development, modern UI |
| Build | Vite + CRXJS | HMR, Manifest V3 compatible |
| API Gateway | Cloudflare Workers | Global edge, low latency, generous free tier |
| Backend/DB | Supabase (PostgreSQL + Auth) | Free tier, built-in auth, real-time |
| Encryption | Web Crypto API (AES-256-GCM) | Native browser support, zero dependencies |
| Web Portal | Next.js on Vercel | SEO-friendly landing/share pages |
| Payments | Lemon Squeezy (India) / Stripe (international) | GST handling, Indian card support |
| Analytics | Plausible | Privacy-friendly |
| Errors | Sentry | Real-time error monitoring |

### 8.2 Key Components

- **Chrome Extension (Popup + Background + Content Script):** Core product. Popup for UI, background service worker for cookie operations and heartbeat checks, content script for localStorage access.
- **API (Cloudflare Workers):** Stateless API layer handling share CRUD, import logging, auth, and subscription management.
- **Database (Supabase/PostgreSQL):** Stores users, encrypted shares, import logs, revocation guides, team data.
- **Web Portal (Next.js):** Landing page, share import page (for recipients without extension), dashboard for share management.

### 8.3 Data Flow Summary

**Export:** Get cookies → filter/select → encrypt client-side → POST encrypted blob to API → return share URL + password.

**Import:** Enter link + password → GET encrypted blob from API → check expiry/limits → decrypt client-side → `chrome.cookies.set()` each cookie → log import → open target site.

---

## 9. Monetization

### 9.1 Pricing Tiers

| | Free | Pro (₹499/mo) | Team (₹1,499/mo) |
|---|---|---|---|
| Shares/month | 3 | Unlimited | Unlimited |
| Max expiration | 24 hours | 30 days | 30 days |
| Use limits | Up to 3 | Unlimited | Unlimited |
| Import analytics | Count only | Full details | Full + CSV export |
| localStorage sync | ✗ | ✓ | ✓ |
| Webhooks | ✗ | ✓ | ✓ |
| Custom branding | ✗ | ✓ | ✓ |
| Team workspace | ✗ | ✗ | ✓ (up to 10 members) |
| Audit logs | ✗ | ✗ | ✓ |
| API access | ✗ | ✗ | ✓ |
| Support | Community | Email (24h) | Priority (4h) |

### 9.2 Revenue Targets

- **Conservative (M12):** ₹50,000/month (100 Pro users)
- **Optimistic (M12):** ₹2,00,000/month (200 Pro + 50 Team accounts)

---

## 10. Release Plan

### Phase 1 — MVP (Weeks 1–4)

Extension scaffold, cookie export/import, AES-256-GCM encryption, basic popup UI, backend API for share storage, import flow, Chrome Web Store submission.

### Phase 2 — Launch (Weeks 5–8)

Landing page, onboarding flow, user accounts, share management dashboard, basic analytics, revocation guides, Product Hunt launch.

### Phase 3 — Monetization (Weeks 9–12)

Payment integration (Lemon Squeezy/Stripe), Pro tier features (localStorage sync, webhooks, extended expiration, usage analytics, custom branding).

### Phase 4 — Teams (Weeks 13–20)

Team workspace, member management, audit logs, role-based access, API access, SSO integration, admin controls, compliance exports.

### Future Backlog

Firefox extension, Safari extension, mobile companion app, P2P serverless sharing, browser fingerprint sync, enterprise tier with custom deployment.

---

## 11. Go-to-Market Summary

**Pre-launch (2 weeks):** Landing page with email capture, teaser posts on Twitter/LinkedIn, 50 early-user DMs for feedback, Product Hunt assets prepared.

**Launch day:** Product Hunt launch (12:01 AM PST), Twitter thread, LinkedIn post targeting agencies, Reddit posts in r/webdev, r/marketing, r/freelance, email to waitlist, DM outreach to 100 agency owners.

**Post-launch (Weeks 1–4):** Content marketing (agency savings, tutorials, comparison posts), community building (Discord/Slack), respond to every review, weekly Twitter tips.

**Target SEO keywords:** "share website access without password", "share login session securely", "temporary website access sharing", "session sharing tool".

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Chrome Web Store rejection | Medium | High | Strict guideline compliance, clear permission justifications, appeal process ready |
| Low adoption | Medium | High | Validate with 50+ users pre-launch, iterate on feedback, generous free tier |
| Server breach exposes data | Low | Critical | E2E encryption — server never holds plaintext cookies |
| Chrome API breaking changes | Medium | High | Abstracted API layer, monitor Chrome release notes |
| Services blocking cookie imports | Medium | Medium | Expected for some services; document limitations transparently |
| Misuse for account piracy | High | Low | Focus messaging on B2B use cases, clear ToS, domain blocklist |
| Competitor copies the concept | Medium | Medium | Move fast, build community moat, ship team features early |

---

## 13. Legal & Compliance

- **Terms of Service:** Users must only share access they're authorized to share. CookiePass is not liable for misuse or third-party access revocations.
- **Privacy Policy:** Encrypted data stored temporarily, auto-deleted after expiration + 7 days. IPs stored as SHA-256 hashes. No plaintext cookies on server. No data sold.
- **GDPR:** Right to deletion, data portability, consent management, processing records.
- **Chrome Web Store:** No deceptive behavior, clear permission justifications, no remote code execution, privacy policy required.

---

## 14. Open Questions

1. Should we support Firefox from day one, or focus exclusively on Chrome for MVP?
2. What is the right threshold for the free tier — is 3 shares/month generous enough to demonstrate value, or too restrictive?
3. Should recipients need the extension installed, or should we build a web-based import fallback?
4. How do we handle sites with aggressive session invalidation (e.g., IP-pinned sessions)? Document only, or build IP-proxy features later?
5. Legal review: Do we need explicit disclaimers about third-party ToS violations, or is general ToS language sufficient?

---

*This is a living document. Last updated: February 2026.*
