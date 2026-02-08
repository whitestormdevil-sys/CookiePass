import mongoose, { Schema, Document, Model } from 'mongoose';
import { Share as IShare } from '../../types';

export interface ShareDocument extends Omit<IShare, 'id' | 'user_id'>, Document {
  user_id: mongoose.Types.ObjectId;
}

const shareSchema = new Schema<ShareDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    domain: {
      type: String,
      required: true,
      index: true,
    },
    encrypted_data: {
      type: String,
      required: true,
    },
    password_salt: {
      type: String,
      default: null,
    },
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    expires_at: {
      type: Date,
      required: true,
      index: true,
    },
    max_uses: {
      type: Number,
      default: 1,
    },
    used_count: {
      type: Number,
      default: 0,
    },
    is_revoked: {
      type: Boolean,
      default: false,
      index: true,
    },
    revoked_at: {
      type: Date,
      default: null,
    },
    cookie_count: {
      type: Number,
      default: 0,
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    _id: true,
    toJSON: {
      transform(_doc: any, ret: any) {
        delete ret._id;
        delete ret.__v;
        if (ret.user_id && ret.user_id.toString) {
          ret.user_id = ret.user_id.toString();
        }
        return ret;
      },
    },
    toObject: {
      transform(_doc: any, ret: any) {
        delete ret._id;
        delete ret.__v;
        if (ret.user_id && ret.user_id.toString) {
          ret.user_id = ret.user_id.toString();
        }
        return ret;
      },
    },
  }
);

// TTL index: auto-delete documents 7 days after expiry
shareSchema.index({ expires_at: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const Share: Model<ShareDocument> = mongoose.model<ShareDocument>('Share', shareSchema);
export default Share;
