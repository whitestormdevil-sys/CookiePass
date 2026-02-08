import { generateShareId } from '../src/utils/idGenerator';
import { isDomainBlocked, getBlockedDomains } from '../src/utils/domainBlocklist';
import { createShareSchema, registerSchema, loginSchema, logImportSchema } from '../src/utils/validators';
import { TIER_LIMITS } from '../src/types';

// ─── ID Generator Tests ─────────────────────────────────────────────────────

describe('generateShareId', () => {
  it('should generate an 8-character string', () => {
    const id = generateShareId();
    expect(id).toHaveLength(8);
  });

  it('should only contain alphanumeric characters', () => {
    for (let i = 0; i < 100; i++) {
      const id = generateShareId();
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    }
  });

  it('should generate unique IDs', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateShareId());
    }
    // With 62^8 possibilities, collisions in 1000 should be extremely rare
    expect(ids.size).toBeGreaterThanOrEqual(995);
  });
});

// ─── Domain Blocklist Tests ──────────────────────────────────────────────────

describe('isDomainBlocked', () => {
  it('should block known banking domains', () => {
    expect(isDomainBlocked('chase.com')).toBe(true);
    expect(isDomainBlocked('bankofamerica.com')).toBe(true);
    expect(isDomainBlocked('paypal.com')).toBe(true);
  });

  it('should block known email domains', () => {
    expect(isDomainBlocked('gmail.com')).toBe(true);
    expect(isDomainBlocked('outlook.com')).toBe(true);
    expect(isDomainBlocked('protonmail.com')).toBe(true);
  });

  it('should block government domains', () => {
    expect(isDomainBlocked('irs.gov')).toBe(true);
    expect(isDomainBlocked('login.gov')).toBe(true);
  });

  it('should block subdomains of blocked domains', () => {
    expect(isDomainBlocked('online.chase.com')).toBe(true);
    expect(isDomainBlocked('secure.bankofamerica.com')).toBe(true);
  });

  it('should strip www prefix', () => {
    expect(isDomainBlocked('www.chase.com')).toBe(true);
    expect(isDomainBlocked('www.gmail.com')).toBe(true);
  });

  it('should allow non-blocked domains', () => {
    expect(isDomainBlocked('netflix.com')).toBe(false);
    expect(isDomainBlocked('spotify.com')).toBe(false);
    expect(isDomainBlocked('example.com')).toBe(false);
  });

  it('should be case-insensitive', () => {
    expect(isDomainBlocked('Chase.com')).toBe(true);
    expect(isDomainBlocked('GMAIL.COM')).toBe(true);
  });
});

describe('getBlockedDomains', () => {
  it('should return an array of blocked domains', () => {
    const domains = getBlockedDomains();
    expect(Array.isArray(domains)).toBe(true);
    expect(domains.length).toBeGreaterThan(0);
    expect(domains).toContain('chase.com');
  });
});

// ─── Validator Tests ─────────────────────────────────────────────────────────

describe('validators', () => {
  describe('registerSchema', () => {
    it('should accept valid registration', () => {
      const result = registerSchema.parse({
        email: 'test@example.com',
        password: 'securepassword123',
      });
      expect(result.email).toBe('test@example.com');
    });

    it('should reject invalid email', () => {
      expect(() =>
        registerSchema.parse({ email: 'not-an-email', password: 'securepassword123' })
      ).toThrow();
    });

    it('should reject short password', () => {
      expect(() =>
        registerSchema.parse({ email: 'test@example.com', password: 'short' })
      ).toThrow();
    });
  });

  describe('loginSchema', () => {
    it('should accept valid login', () => {
      const result = loginSchema.parse({
        email: 'test@example.com',
        password: 'anypassword',
      });
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('createShareSchema', () => {
    it('should accept valid share creation', () => {
      const result = createShareSchema.parse({
        encrypted_data: 'base64encodeddata...',
        domain: 'netflix.com',
        expires_in_hours: 24,
        max_uses: 3,
      });
      expect(result.domain).toBe('netflix.com');
      expect(result.max_uses).toBe(3);
    });

    it('should reject missing encrypted_data', () => {
      expect(() =>
        createShareSchema.parse({
          domain: 'netflix.com',
          expires_in_hours: 24,
        })
      ).toThrow();
    });

    it('should reject invalid domain', () => {
      expect(() =>
        createShareSchema.parse({
          encrypted_data: 'data',
          domain: '-invalid',
          expires_in_hours: 24,
        })
      ).toThrow();
    });

    it('should reject expiration > 720 hours', () => {
      expect(() =>
        createShareSchema.parse({
          encrypted_data: 'data',
          domain: 'netflix.com',
          expires_in_hours: 1000,
        })
      ).toThrow();
    });

    it('should default max_uses to 1', () => {
      const result = createShareSchema.parse({
        encrypted_data: 'data',
        domain: 'netflix.com',
        expires_in_hours: 24,
      });
      expect(result.max_uses).toBe(1);
    });

    it('should default settings to empty object', () => {
      const result = createShareSchema.parse({
        encrypted_data: 'data',
        domain: 'netflix.com',
        expires_in_hours: 24,
      });
      expect(result.settings).toEqual({});
    });
  });

  describe('logImportSchema', () => {
    it('should accept valid import log', () => {
      const result = logImportSchema.parse({
        success: true,
        user_agent: 'Mozilla/5.0',
      });
      expect(result.success).toBe(true);
    });

    it('should require success field', () => {
      expect(() => logImportSchema.parse({})).toThrow();
    });
  });
});

// ─── Tier Limits Tests ───────────────────────────────────────────────────────

describe('TIER_LIMITS', () => {
  it('should have correct free tier limits', () => {
    expect(TIER_LIMITS.free.max_shares_per_month).toBe(3);
    expect(TIER_LIMITS.free.max_expiration_hours).toBe(24);
    expect(TIER_LIMITS.free.max_uses_per_share).toBe(3);
  });

  it('should have unlimited pro tier', () => {
    expect(TIER_LIMITS.pro.max_shares_per_month).toBeNull();
    expect(TIER_LIMITS.pro.max_expiration_hours).toBe(720);
    expect(TIER_LIMITS.pro.max_uses_per_share).toBeNull();
  });

  it('should have team tier same as pro', () => {
    expect(TIER_LIMITS.team.max_shares_per_month).toBeNull();
    expect(TIER_LIMITS.team.max_expiration_hours).toBe(720);
    expect(TIER_LIMITS.team.max_uses_per_share).toBeNull();
  });
});
