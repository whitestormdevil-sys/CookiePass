import { Router } from 'express';
import { subscriptionService } from '../services/subscriptionService';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { checkoutSchema } from '../utils/validators';

const router = Router();

/**
 * GET /subscription
 * Get current subscription status.
 */
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const status = await subscriptionService.getStatus(req.userId!);

    res.json({
      success: true,
      data: status,
    });
  })
);

/**
 * POST /subscription/checkout
 * Create a checkout session.
 */
router.post(
  '/checkout',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { tier } = checkoutSchema.parse(req.body);
    const session = await subscriptionService.createCheckoutSession(req.userId!, tier);

    res.json({
      success: true,
      data: session,
    });
  })
);

/**
 * POST /subscription/cancel
 * Cancel the current subscription.
 */
router.post(
  '/cancel',
  requireAuth,
  asyncHandler(async (req, res) => {
    await subscriptionService.cancelSubscription(req.userId!);

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  })
);

/**
 * POST /subscription/webhook
 * Handle payment provider webhooks (Stripe / Lemon Squeezy).
 */
router.post(
  '/webhook',
  asyncHandler(async (req, res) => {
    // In production, verify the webhook signature:
    // const sig = req.headers['stripe-signature'];
    // const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    const event = req.body;

    if (!event || !event.type) {
      res.status(400).json({
        success: false,
        error: 'Invalid webhook payload',
      });
      return;
    }

    await subscriptionService.handleWebhook(event);

    res.json({ success: true, received: true });
  })
);

export default router;
