import mongoose from "mongoose";
import User from "./user";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: User }],
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;
