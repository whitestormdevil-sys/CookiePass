import bcrypt from 'bcrypt';
import { User } from '../db/models/User';
import { PublicUser } from '../types';

const SALT_ROUNDS = 12;

export class UserService {
  /**
   * Create a new user with hashed password.
   */
  async createUser(email: string, password: string): Promise<PublicUser> {
    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existing) {
      const err = new Error('An account with this email already exists') as Error & {
        statusCode: number;
      };
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email: email.toLowerCase(),
      password_hash: passwordHash,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      created_at: user.created_at,
      subscription_tier: user.subscription_tier,
      shares_this_month: user.shares_this_month,
    } as PublicUser;
  }

  /**
   * Verify email/password and return user if valid.
   */
  async verifyCredentials(email: string, password: string) {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      const err = new Error('Invalid email or password') as Error & { statusCode: number };
      err.statusCode = 401;
      throw err;
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      const err = new Error('Invalid email or password') as Error & { statusCode: number };
      err.statusCode = 401;
      throw err;
    }

    return user.toObject();
  }

  /**
   * Get user by ID.
   */
  async getUserById(id: string) {
    const user = await User.findById(id);
    return user ? user.toObject() : null;
  }

  /**
   * Get public user profile by ID.
   */
  async getPublicUser(id: string): Promise<PublicUser | null> {
    const user = await User.findById(id)
      .select('email created_at subscription_tier shares_this_month')
      .lean();

    if (!user) return null;

    return {
      id: (user as any)._id.toString(),
      email: user.email,
      created_at: user.created_at,
      subscription_tier: user.subscription_tier,
      shares_this_month: user.shares_this_month,
    } as PublicUser;
  }

  /**
   * Reset monthly share counter if needed.
   */
  async resetMonthlySharesIfNeeded(userId: string): Promise<void> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    await User.updateOne(
      {
        _id: userId,
        shares_month_reset: { $lt: startOfMonth },
      },
      {
        $set: {
          shares_this_month: 0,
          shares_month_reset: new Date(),
        },
      }
    );
  }

  /**
   * Increment monthly share counter.
   */
  async incrementShareCount(userId: string): Promise<void> {
    await User.updateOne(
      { _id: userId },
      { $inc: { shares_this_month: 1 } }
    );
  }

  /**
   * Update user's Stripe customer ID.
   */
  async updateStripeCustomerId(userId: string, customerId: string): Promise<void> {
    await User.updateOne(
      { _id: userId },
      { $set: { stripe_customer_id: customerId } }
    );
  }

  /**
   * Update user's subscription tier.
   */
  async updateSubscription(
    userId: string,
    tier: string,
    expiresAt: Date | null
  ): Promise<void> {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          subscription_tier: tier,
          subscription_expires_at: expiresAt,
        },
      }
    );
  }
}

export const userService = new UserService();
