import mongoose, { Schema, Types, Document } from "mongoose";

export interface ProjectDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  team: Types.ObjectId;
  members: Types.ObjectId[];
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);
export default Project;
