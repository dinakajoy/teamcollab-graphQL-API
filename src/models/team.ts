import mongoose, { Schema, Types } from "mongoose";

export interface TeamDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  members: Types.ObjectId[];
}


const TeamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Team = mongoose.model<TeamDocument>("Team", TeamSchema);
export default Team;
