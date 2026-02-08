import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createShareSchema = z.object({
  encrypted_data: z
    .string()
    .min(1, 'Encrypted data is required')
    .max(1_000_000, 'Encrypted data too large'),
  domain: z
    .string()
    .min(1, 'Domain is required')
    .max(255, 'Domain too long')
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/, 'Invalid domain format'),
  expires_in_hours: z
    .number()
    .int()
    .min(1, 'Minimum expiration is 1 hour')
    .max(720, 'Maximum expiration is 720 hours (30 days)'),
  max_uses: z.number().int().min(1).max(10000).optional().default(1),
  password_salt: z.string().max(44).optional(),
  cookie_count: z.number().int().min(0).max(1000).optional().default(0),
  settings: z
    .object({
      require_password: z.boolean().optional(),
      notify_on_import: z.boolean().optional(),
      auto_revoke_on_max_uses: z.boolean().optional(),
    })
    .passthrough()
    .optional()
    .default({}),
});

export const logImportSchema = z.object({
  success: z.boolean(),
  user_agent: z.string().max(500).optional(),
  error_message: z.string().max(1000).optional(),
});

export const listSharesSchema = z.object({
  status: z.enum(['active', 'expired', 'revoked', 'all']).optional().default('all'),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export const checkoutSchema = z.object({
  tier: z.enum(['pro', 'team']),
});
