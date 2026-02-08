import { Router } from 'express';
import { userService } from '../services/userService';
import { requireAuth, generateToken } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { registerSchema, loginSchema } from '../utils/validators';

const router = Router();

/**
 * POST /auth/register
 * Create a new account and return JWT.
 */
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password } = registerSchema.parse(req.body);

    const user = await userService.createUser(email, password);
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  })
);

/**
 * POST /auth/login
 * Login and return JWT.
 */
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await userService.verifyCredentials(email, password);
    const token = generateToken(user.id, user.email);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          subscription_tier: user.subscription_tier,
          shares_this_month: user.shares_this_month,
        },
        token,
      },
    });
  })
);

/**
 * POST /auth/logout
 * Invalidate token (client-side — we return success).
 * For true server-side invalidation, implement a token blacklist.
 */
router.post(
  '/logout',
  requireAuth,
  asyncHandler(async (_req, res) => {
    // In a production system, you'd add the token to a blacklist/revocation list
    // For now, the client should simply delete the token
    res.json({
      success: true,
      message: 'Logged out successfully. Please discard your token.',
    });
  })
);

/**
 * GET /auth/me
 * Get current authenticated user profile.
 */
router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await userService.getPublicUser(req.userId!);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: user,
    });
  })
);

export default router;
