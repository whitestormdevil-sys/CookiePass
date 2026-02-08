import mongoose, { Schema, Document, Model } from 'mongoose';
import { Team as ITeam } from '../../types';

export interface TeamDocument extends Omit<ITeam, 'id' | 'owner_id'>, Document {
  owner_id: mongoose.Types.ObjectId;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.owner_id && ret.owner_id.toString) {
          ret.owner_id = ret.owner_id.toString();
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
        if (ret.owner_id && ret.owner_id.toString) {
          ret.owner_id = ret.owner_id.toString();
        }
        return ret;
      },
    },
  }
);

export const Team: Model<TeamDocument> = mongoose.model<TeamDocument>('Team', teamSchema);
export default Team;
