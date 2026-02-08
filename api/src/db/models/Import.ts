import mongoose, { Schema, Document, Model } from 'mongoose';
import { Import as IImport } from '../../types';

export interface ImportDocument extends Omit<IImport, 'id' | 'share_id' | 'recipient_user_id'>, Document {
  share_id: string;
  recipient_user_id: mongoose.Types.ObjectId | null;
}

const importSchema = new Schema<ImportDocument>(
  {
    share_id: {
      type: String,
      required: true,
      index: true,
    },
    imported_at: {
      type: Date,
      default: () => new Date(),
      index: true,
    },
    ip_hash: {
      type: String,
      default: null,
    },
    user_agent: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
      maxlength: 2,
    },
    success: {
      type: Boolean,
      default: true,
    },
    error_message: {
      type: String,
      default: null,
    },
    recipient_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.recipient_user_id && ret.recipient_user_id.toString) {
          ret.recipient_user_id = ret.recipient_user_id.toString();
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.recipient_user_id && ret.recipient_user_id.toString) {
          ret.recipient_user_id = ret.recipient_user_id.toString();
        }
        return ret;
      },
    },
  }
);

export const Import: Model<ImportDocument> = mongoose.model<ImportDocument>('Import', importSchema);
export default Import;
