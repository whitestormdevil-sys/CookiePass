import mongoose, { Schema, Document, Model } from 'mongoose';
import { User as IUser, SubscriptionTier } from '../../types';

export interface UserDocument extends Omit<IUser, 'id'>, Document {}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    subscription_tier: {
      type: String,
      enum: ['free', 'pro', 'team'] as SubscriptionTier[],
      default: 'free',
    },
    subscription_expires_at: {
      type: Date,
      default: null,
    },
    shares_this_month: {
      type: Number,
      default: 0,
    },
    shares_month_reset: {
      type: Date,
      default: () => new Date(),
    },
    stripe_customer_id: {
      type: String,
      default: null,
      index: true,
      sparse: true,
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      virtuals: true,
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
export default User;
