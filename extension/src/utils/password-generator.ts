// ============================================================================
// CookiePass Memorable Password Generator
// ============================================================================
// Generates passwords like "autumn-tiger-92" that are easy to share
// verbally or via message while maintaining adequate entropy.
// ============================================================================

const ADJECTIVES = [
  'autumn', 'bright', 'calm', 'cool', 'crisp', 'daring', 'dusty', 'eager',
  'fierce', 'fresh', 'gentle', 'golden', 'happy', 'humble', 'ivory', 'jolly',
  'keen', 'lively', 'mellow', 'noble', 'olive', 'proud', 'quiet', 'rapid',
  'rustic', 'sandy', 'silent', 'silver', 'solar', 'steady', 'sunny', 'swift',
  'tender', 'tidal', 'urban', 'vivid', 'warm', 'wild', 'witty', 'young',
  'brave', 'clever', 'frosty', 'lucky', 'misty', 'polar', 'royal', 'snowy',
  'velvet', 'winter', 'cosmic', 'lunar', 'ocean', 'rusty', 'stormy', 'azure',
  'coral', 'crystal', 'emerald', 'floral', 'hidden', 'maple', 'marble',
  'neon', 'pastel', 'shadow', 'timber', 'violet', 'zenith',
];

const NOUNS = [
  'tiger', 'eagle', 'bear', 'wolf', 'hawk', 'fox', 'deer', 'owl',
  'raven', 'lion', 'panda', 'otter', 'falcon', 'cobra', 'heron', 'bison',
  'crane', 'viper', 'whale', 'shark', 'pearl', 'flame', 'river', 'stone',
  'cedar', 'cloud', 'comet', 'delta', 'ember', 'frost', 'grove', 'haven',
  'iris', 'jade', 'knot', 'lake', 'mesa', 'nova', 'oak', 'pine',
  'reef', 'sage', 'tide', 'vale', 'wave', 'bloom', 'cliff', 'dune',
  'forge', 'gale', 'helm', 'isle', 'jewel', 'knoll', 'lark', 'marsh',
  'nest', 'opal', 'peak', 'ridge', 'shore', 'trail', 'creek', 'maple',
];

/**
 * Get a cryptographically random integer in range [0, max).
 */
function randomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Generate a memorable password like "autumn-tiger-92".
 *
 * Format: adjective-noun-number
 * Entropy: ~70 * 70 * 100 = ~490,000 combinations ≈ 18.9 bits
 * Combined with PBKDF2 (100k iterations), this provides adequate security
 * for time-limited, use-limited shares.
 */
export function generatePassword(): string {
  const adjective = ADJECTIVES[randomInt(ADJECTIVES.length)];
  const noun = NOUNS[randomInt(NOUNS.length)];
  const number = randomInt(100); // 0-99
  const paddedNumber = number.toString().padStart(2, '0');
  return `${adjective}-${noun}-${paddedNumber}`;
}

/**
 * Generate a stronger password with two word pairs.
 * Format: adjective-noun-adjective-noun-number
 * Entropy: ~70^4 * 100 ≈ 24M combinations ≈ 37.5 bits
 */
export function generateStrongPassword(): string {
  const adj1 = ADJECTIVES[randomInt(ADJECTIVES.length)];
  const noun1 = NOUNS[randomInt(NOUNS.length)];
  const adj2 = ADJECTIVES[randomInt(ADJECTIVES.length)];
  const noun2 = NOUNS[randomInt(NOUNS.length)];
  const number = randomInt(100);
  const paddedNumber = number.toString().padStart(2, '0');
  return `${adj1}-${noun1}-${adj2}-${noun2}-${paddedNumber}`;
}

/**
 * Validate a password meets minimum requirements.
 */
export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (!password || password.length < 4) {
    return { valid: false, reason: 'Password must be at least 4 characters' };
  }
  if (password.length > 128) {
    return { valid: false, reason: 'Password must be less than 128 characters' };
  }
  return { valid: true };
}
