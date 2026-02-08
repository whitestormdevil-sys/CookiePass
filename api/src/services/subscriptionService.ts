import { User } from '../db/models/User';
import { SubscriptionStatus, SubscriptionTier, TIER_LIMITS } from '../types';
import { userService } from './userService';
import { createError } from '../middleware/errorHandler';

export class SubscriptionService {
  /**
   * Get current subscription status for a user.
   */
  async getStatus(userId: string): Promise<SubscriptionStatus> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    const tier = user.subscription_tier as SubscriptionTier;

    // Check if subscription is still active (for paid tiers)
    const isActive =
      tier === 'free' ||
      (user.subscription_expires_at !== null &&
        new Date(user.subscription_expires_at) > new Date());

    // If subscription expired, treat as free
    const effectiveTier: SubscriptionTier = isActive ? tier : 'free';
    const effectiveLimits = TIER_LIMITS[effectiveTier];

    return {
      tier: effectiveTier,
      expires_at: isActive ? user.subscription_expires_at : null,
      shares_this_month: user.shares_this_month,
      shares_limit: effectiveLimits.max_shares_per_month,
      is_active: isActive,
    };
  }

  /**
   * Create a Stripe checkout session.
   * This is a placeholder — integrate with Stripe/Lemon Squeezy as needed.
   */
  async createCheckoutSession(
    userId: string,
    tier: 'pro' | 'team'
  ): Promise<{ url: string; session_id: string }> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    const priceId =
      tier === 'pro'
        ? process.env.STRIPE_PRO_PRICE_ID
        : process.env.STRIPE_TEAM_PRICE_ID;

    if (!priceId) {
      throw createError('Payment not configured. Contact support.', 503);
    }

    // Return placeholder — replace with actual Stripe integration
    return {
      url: `https://checkout.stripe.com/placeholder?price=${priceId}&customer_email=${user.email}`,
      session_id: `cs_placeholder_${Date.now()}`,
    };
  }

  /**
   * Cancel a subscription.
   */
  async cancelSubscription(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    if (user.subscription_tier === 'free') {
      throw createError('No active subscription to cancel', 400);
    }

    // In production: cancel Stripe subscription, then update on webhook
    // For now, just downgrade immediately
    await userService.updateSubscription(userId, 'free', null);
  }

  /**
   * Handle Stripe webhook events.
   */
  async handleWebhook(event: {
    type: string;
    data: { object: Record<string, unknown> };
  }): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer as string;
        const tier = (session.metadata as Record<string, string>)?.tier || 'pro';

        // Find user by stripe customer ID
        const user = await User.findOne({ stripe_customer_id: customerId }).lean();

        if (user) {
          const expiresAt = new Date();
          expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year subscription
          await userService.updateSubscription((user as any)._id.toString(), tier, expiresAt);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        const user = await User.findOne({ stripe_customer_id: customerId }).lean();

        if (user) {
          await userService.updateSubscription((user as any)._id.toString(), 'free', null);
        }
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  }
}

export const subscriptionService = new SubscriptionService();
