// ============================================================================
// CookiePass Domain Blocklist
// ============================================================================
// Prevents sharing cookies from sensitive domains:
// banking, email, government, healthcare, crypto, password managers
// ============================================================================

import type { DomainBlockInfo } from '@/types';

interface BlocklistCategory {
  domains: string[];
  patterns: RegExp[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
}

const BLOCKLIST: Record<string, BlocklistCategory> = {
  banking: {
    domains: [
      'chase.com', 'bankofamerica.com', 'wellsfargo.com', 'citi.com',
      'citibank.com', 'usbank.com', 'pnc.com', 'capitalone.com',
      'td.com', 'tdbank.com', 'ally.com', 'schwab.com', 'fidelity.com',
      'vanguard.com', 'etrade.com', 'ameritrade.com', 'tdameritrade.com',
      'discover.com', 'americanexpress.com', 'amex.com', 'goldmansachs.com',
      'barclays.co.uk', 'barclays.com', 'hsbc.co.uk', 'hsbc.com',
      'lloydsbank.com', 'natwest.com', 'monzo.com', 'revolut.com',
      'starlingbank.com', 'ing.com', 'deutschebank.de',
      'td.ca', 'rbc.com', 'scotiabank.com', 'bmo.com', 'cibc.com',
      'commbank.com.au', 'westpac.com.au', 'anz.com.au', 'nab.com.au',
      'jpmorgan.com', 'morganstanley.com', 'ubs.com',
      // Payment Processors
      'paypal.com', 'stripe.com', 'venmo.com', 'cashapp.com',
      'wise.com', 'transferwise.com', 'skrill.com', 'payoneer.com',
    ],
    patterns: [
      /bank/i, /credit[-_]?union/i, /mortgage/i, /brokerage/i,
    ],
    severity: 'critical',
    reason: 'Financial institution — sharing could expose sensitive banking data',
  },

  crypto: {
    domains: [
      'coinbase.com', 'binance.com', 'kraken.com', 'gemini.com',
      'crypto.com', 'bitfinex.com', 'bitstamp.com', 'kucoin.com',
      'gate.io', 'bybit.com', 'okx.com', 'huobi.com',
      'blockchain.com', 'metamask.io', 'phantom.app',
    ],
    patterns: [
      /crypto/i, /exchange/i, /defi/i, /wallet/i,
    ],
    severity: 'critical',
    reason: 'Cryptocurrency platform — sharing could lead to fund theft',
  },

  email: {
    domains: [
      'gmail.com', 'mail.google.com', 'outlook.com', 'outlook.live.com',
      'hotmail.com', 'live.com', 'yahoo.com', 'mail.yahoo.com',
      'aol.com', 'icloud.com', 'protonmail.com', 'proton.me',
      'tutanota.com', 'tuta.io', 'fastmail.com', 'zohomail.com',
      'mail.ru', 'yandex.com', 'gmx.com', 'hushmail.com',
    ],
    patterns: [
      /^mail\./i, /^email\./i, /^webmail\./i, /^inbox\./i,
    ],
    severity: 'critical',
    reason: 'Email provider — sharing gives access to private communications & password resets',
  },

  government: {
    domains: [
      'irs.gov', 'ssa.gov', 'usa.gov', 'medicare.gov', 'healthcare.gov',
      'login.gov', 'id.me', 'treasury.gov', 'state.gov', 'va.gov',
      'studentaid.gov', 'gov.uk', 'hmrc.gov.uk', 'nhs.uk',
      'canada.ca', 'gc.ca', 'cra-arc.gc.ca', 'my.gov.au', 'ato.gov.au',
      'europa.eu',
    ],
    patterns: [
      /\.gov$/i, /\.gov\.[a-z]{2}$/i, /\.mil$/i, /\.mil\.[a-z]{2}$/i,
    ],
    severity: 'critical',
    reason: 'Government website — contains sensitive personal/tax data',
  },

  healthcare: {
    domains: [
      'mychart.com', 'epic.com', 'cerner.com', 'athenahealth.com',
      'anthem.com', 'cigna.com', 'aetna.com', 'uhc.com',
      'unitedhealth.com', 'kaiserpermanente.org', 'bcbs.com',
      'cvs.com', 'walgreens.com', 'express-scripts.com',
      'teladoc.com', 'mdlive.com', 'zocdoc.com',
    ],
    patterns: [
      /health/i, /medical/i, /hospital/i, /patient/i,
      /pharmacy/i, /prescription/i, /hipaa/i,
    ],
    severity: 'critical',
    reason: 'Healthcare website — contains protected health information (PHI)',
  },

  passwordManagers: {
    domains: [
      'lastpass.com', '1password.com', 'bitwarden.com', 'dashlane.com',
      'keeper.com', 'nordpass.com', 'roboform.com', 'enpass.io',
      'keepersecurity.com',
    ],
    patterns: [
      /password[-_]?manager/i, /vault/i,
    ],
    severity: 'critical',
    reason: 'Password manager — sharing could expose all stored credentials',
  },

  identity: {
    domains: [
      'accounts.google.com', 'login.microsoft.com', 'login.live.com',
      'appleid.apple.com', 'okta.com', 'auth0.com', 'onelogin.com',
      'duo.com', 'ping.com',
    ],
    patterns: [
      /^login\./i, /^signin\./i, /^auth\./i, /^sso\./i, /^identity\./i,
      /^accounts?\./i, /^oauth/i, /^saml/i,
    ],
    severity: 'critical',
    reason: 'Identity provider — controls access to multiple linked services',
  },
};

/**
 * Normalize a domain for comparison (remove leading dot, lowercase).
 */
function normalizeDomain(domain: string): string {
  return domain.toLowerCase().replace(/^\./, '').replace(/^www\./, '');
}

/**
 * Extract the registrable domain (e.g., "sub.example.com" → "example.com").
 */
function getRegistrableDomain(domain: string): string {
  const parts = normalizeDomain(domain).split('.');
  if (parts.length <= 2) return parts.join('.');
  // Handle co.uk, com.au etc.
  const twoPartTLDs = ['co.uk', 'com.au', 'co.nz', 'co.in', 'com.br', 'co.za', 'org.uk'];
  const lastTwo = parts.slice(-2).join('.');
  if (twoPartTLDs.includes(lastTwo)) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

/**
 * Check if a domain is blocked.
 */
export function checkDomain(domain: string): DomainBlockInfo {
  const normalized = normalizeDomain(domain);
  const registrable = getRegistrableDomain(domain);

  for (const [category, config] of Object.entries(BLOCKLIST)) {
    // Check exact domain matches
    for (const blockedDomain of config.domains) {
      if (
        normalized === blockedDomain ||
        normalized.endsWith('.' + blockedDomain) ||
        registrable === blockedDomain
      ) {
        return {
          isBlocked: true,
          category,
          severity: config.severity,
          reason: config.reason,
        };
      }
    }

    // Check patterns
    for (const pattern of config.patterns) {
      if (pattern.test(normalized)) {
        return {
          isBlocked: true,
          category,
          severity: config.severity,
          reason: config.reason,
        };
      }
    }
  }

  return { isBlocked: false };
}

/**
 * Check if a URL is blocked.
 */
export function checkUrl(url: string): DomainBlockInfo {
  try {
    const parsed = new URL(url);
    return checkDomain(parsed.hostname);
  } catch {
    return { isBlocked: false };
  }
}

/**
 * Get all blocked categories (for display in settings).
 */
export function getBlockedCategories(): { name: string; reason: string; count: number }[] {
  return Object.entries(BLOCKLIST).map(([name, config]) => ({
    name,
    reason: config.reason,
    count: config.domains.length,
  }));
}
