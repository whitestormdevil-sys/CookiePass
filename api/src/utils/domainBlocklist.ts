/**
 * Domain blocklist — prevents sharing cookies for sensitive domains.
 * Includes banking, email providers, government, and healthcare sites.
 */

const BLOCKED_DOMAINS: string[] = [
  // Banking & Financial
  'chase.com',
  'bankofamerica.com',
  'wellsfargo.com',
  'citi.com',
  'citibank.com',
  'usbank.com',
  'capitalone.com',
  'ally.com',
  'schwab.com',
  'fidelity.com',
  'vanguard.com',
  'tdameritrade.com',
  'etrade.com',
  'robinhood.com',
  'coinbase.com',
  'binance.com',
  'kraken.com',
  'paypal.com',
  'venmo.com',
  'stripe.com',
  'wise.com',
  'revolut.com',
  'barclays.co.uk',
  'hsbc.com',
  'lloydsbank.com',
  'natwest.com',

  // Email Providers
  'gmail.com',
  'mail.google.com',
  'outlook.com',
  'outlook.live.com',
  'mail.yahoo.com',
  'protonmail.com',
  'proton.me',
  'tutanota.com',
  'icloud.com',

  // Government
  'irs.gov',
  'ssa.gov',
  'login.gov',
  'id.me',
  'gov.uk',
  'service.gov.uk',
  'cra-arc.gc.ca',
  'canada.ca',

  // Healthcare
  'mychart.com',
  'myhealth.va.gov',
  'healthline.com',
  'portal.healtheon.com',

  // Identity & Auth Providers
  'accounts.google.com',
  'appleid.apple.com',
  'login.microsoftonline.com',
  'auth0.com',
  'okta.com',

  // Social (main account pages)
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
];

const blockedSet = new Set(BLOCKED_DOMAINS.map((d) => d.toLowerCase()));

/**
 * Check if a domain is blocked from cookie sharing.
 * Matches exact domain or parent domain (e.g., "mail.google.com" matches "google.com" pattern
 * only if exact listed, not wildcard).
 */
export function isDomainBlocked(domain: string): boolean {
  const normalized = domain.toLowerCase().replace(/^www\./, '');

  // Check exact match
  if (blockedSet.has(normalized)) {
    return true;
  }

  // Check if any blocked domain is a suffix (subdomain match)
  for (const blocked of blockedSet) {
    if (normalized.endsWith('.' + blocked)) {
      return true;
    }
  }

  return false;
}

/**
 * Get the blocklist for transparency / display purposes.
 */
export function getBlockedDomains(): string[] {
  return [...BLOCKED_DOMAINS];
}
