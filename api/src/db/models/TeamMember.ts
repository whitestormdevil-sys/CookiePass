import mongoose, { Schema, Document, Model } from 'mongoose';
import { TeamMember as ITeamMember } from '../../types';

export interface TeamMemberDocument extends Omit<ITeamMember, 'id' | 'team_id' | 'user_id'>, Document {
  team_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
}

const teamMemberSchema = new Schema<TeamMemberDocument>(
  {
    team_id: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      index: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member',
    },
    invited_at: {
      type: Date,
      default: () => new Date(),
    },
    joined_at: {
      type: Date,
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
        if (ret.team_id && ret.team_id.toString) {
          ret.team_id = ret.team_id.toString();
        }
        if (ret.user_id && ret.user_id.toString) {
          ret.user_id = ret.user_id.toString();
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
        if (ret.team_id && ret.team_id.toString) {
          ret.team_id = ret.team_id.toString();
        }
        if (ret.user_id && ret.user_id.toString) {
          ret.user_id = ret.user_id.toString();
        }
        return ret;
      },
    },
  }
);

// Compound unique index: a user can only be in a team once
teamMemberSchema.index({ team_id: 1, user_id: 1 }, { unique: true });

export const TeamMember: Model<TeamMemberDocument> = mongoose.model<TeamMemberDocument>(
  'TeamMember',
  teamMemberSchema
);
export default TeamMember;
