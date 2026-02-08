import { Share } from '../db/models/Share';
import { CreateShareInput, TIER_LIMITS, SubscriptionTier } from '../types';
import { generateShareId } from '../utils/idGenerator';
import { isDomainBlocked } from '../utils/domainBlocklist';
import { userService } from './userService';
import { createError } from '../middleware/errorHandler';

export class ShareService {
  /**
   * Create a new share link.
   */
  async createShare(userId: string, input: CreateShareInput) {
    // Check domain blocklist
    if (isDomainBlocked(input.domain)) {
      throw createError(
        `Sharing cookies for "${input.domain}" is not allowed for security reasons.`,
        403
      );
    }

    // Get user and check tier limits
    const user = await userService.getUserById(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    const tier = user.subscription_tier as SubscriptionTier;
    const limits = TIER_LIMITS[tier];

    // Reset monthly counter if needed
    await userService.resetMonthlySharesIfNeeded(userId);

    // Re-fetch after potential reset
    const freshUser = await userService.getUserById(userId);
    if (!freshUser) {
      throw createError('User not found', 404);
    }

    // Check monthly share limit
    if (
      limits.max_shares_per_month !== null &&
      freshUser.shares_this_month >= limits.max_shares_per_month
    ) {
      throw createError(
        `Monthly share limit reached (${limits.max_shares_per_month} shares). Upgrade to Pro for unlimited shares.`,
        429
      );
    }

    // Check expiration limit
    if (input.expires_in_hours > limits.max_expiration_hours) {
      throw createError(
        `Maximum expiration for ${tier} tier is ${limits.max_expiration_hours} hours.`,
        400
      );
    }

    // Check max uses limit
    if (
      limits.max_uses_per_share !== null &&
      input.max_uses !== undefined &&
      input.max_uses > limits.max_uses_per_share
    ) {
      throw createError(
        `Maximum uses per share for ${tier} tier is ${limits.max_uses_per_share}.`,
        400
      );
    }

    const shortId = generateShareId();
    const expiresAt = new Date(Date.now() + input.expires_in_hours * 60 * 60 * 1000);

    const share = await Share.create({
      id: shortId,
      user_id: userId,
      domain: input.domain,
      encrypted_data: input.encrypted_data,
      password_salt: input.password_salt || null,
      expires_at: expiresAt,
      max_uses: input.max_uses || 1,
      cookie_count: input.cookie_count || 0,
      settings: input.settings || {},
    });

    // Increment user's monthly share count
    await userService.incrementShareCount(userId);

    return share.toObject();
  }

  /**
   * Get a share by ID (public — for importing).
   * Validates it's not expired/revoked/exhausted.
   */
  async getShareForImport(shareId: string) {
    const share = await Share.findOne({ id: shareId });

    if (!share) {
      throw createError('Share not found', 404);
    }

    if (share.is_revoked) {
      throw createError('This share has been revoked', 410);
    }

    if (new Date(share.expires_at) < new Date()) {
      throw createError('This share has expired', 410);
    }

    if (share.max_uses > 0 && share.used_count >= share.max_uses) {
      throw createError('This share has reached its usage limit', 410);
    }

    const usesRemaining =
      share.max_uses > 0 ? share.max_uses - share.used_count : null;

    return {
      id: share.id,
      domain: share.domain,
      encrypted_data: share.encrypted_data,
      password_salt: share.password_salt,
      cookie_count: share.cookie_count || 0,
      expires_at: share.expires_at,
      uses_remaining: usesRemaining,
      settings: share.settings,
    };
  }

  /**
   * List shares for a user with filtering.
   */
  async listShares(
    userId: string,
    status: string = 'all',
    limit: number = 20,
    offset: number = 0
  ) {
    const filter: Record<string, unknown> = { user_id: userId };

    const now = new Date();
    switch (status) {
      case 'active':
        filter.is_revoked = false;
        filter.expires_at = { $gt: now };
        break;
      case 'expired':
        filter.expires_at = { $lte: now };
        break;
      case 'revoked':
        filter.is_revoked = true;
        break;
      // 'all' — no additional filter
    }

    const [shares, total] = await Promise.all([
      Share.find(filter)
        .sort({ created_at: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Share.countDocuments(filter),
    ]);

    // Transform to match expected API shape
    const transformed = shares.map((s) => ({
      ...s,
      id: s.id,
      user_id: s.user_id.toString(),
    }));

    return { shares: transformed, total };
  }

  /**
   * Revoke a share (only by owner).
   */
  async revokeShare(shareId: string, userId: string) {
    const share = await Share.findOneAndUpdate(
      { id: shareId, user_id: userId },
      { $set: { is_revoked: true, revoked_at: new Date() } },
      { new: true }
    );

    if (!share) {
      throw createError('Share not found or not owned by you', 404);
    }

    return share.toObject();
  }

  /**
   * Increment the used_count of a share.
   */
  async incrementUsedCount(shareId: string): Promise<void> {
    await Share.updateOne(
      { id: shareId },
      { $inc: { used_count: 1 } }
    );
  }

  /**
   * Check if a share belongs to a user.
   */
  async getShareOwner(shareId: string): Promise<string | null> {
    const share = await Share.findOne({ id: shareId }).select('user_id').lean();
    return share ? share.user_id.toString() : null;
  }

  /**
   * Cleanup expired shares older than 7 days.
   * Note: With MongoDB TTL index this happens automatically,
   * but this method is kept for manual cleanup if needed.
   */
  async cleanupExpiredShares(): Promise<number> {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const result = await Share.deleteMany({
      expires_at: { $lt: cutoff },
    });
    return result.deletedCount;
  }
}

export const shareService = new ShareService();
