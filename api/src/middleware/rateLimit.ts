import rateLimit from 'express-rate-limit';
import { Request } from 'express';

/**
 * Default rate limiter: 100 requests per minute.
 */
export const defaultLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

/**
 * Share creation limiter: varies by subscription tier.
 * Free: 10/hour, Pro/Team: 100/hour.
 * Since we can't easily check tier in rate-limit middleware,
 * we use a generous limit here and enforce tier limits in the service layer.
 */
export const createShareLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // generous limit; tier enforcement happens in shareService
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => req.userId || req.ip || 'unknown',
  message: {
    success: false,
    error: 'Share creation rate limit exceeded. Please try again later.',
  },
});

/**
 * Share retrieval (import) limiter: 60/minute.
 */
export const getShareLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

/**
 * Import logging limiter: 10/minute per IP.
 */
export const importLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Import rate limit exceeded. Please try again later.',
  },
});
