import mongoose, { Schema, Document, Model } from 'mongoose';
import { RevocationGuide as IRevocationGuide } from '../../types';

export interface RevocationGuideDocument extends Omit<IRevocationGuide, 'id'>, Document {}

const revocationGuideSchema = new Schema<RevocationGuideDocument>(
  {
    domain_pattern: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    service_name: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    settings_url: {
      type: String,
      default: null,
    },
    last_verified_at: {
      type: Date,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
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

export const RevocationGuide: Model<RevocationGuideDocument> = mongoose.model<RevocationGuideDocument>(
  'RevocationGuide',
  revocationGuideSchema
);
export default RevocationGuide;
