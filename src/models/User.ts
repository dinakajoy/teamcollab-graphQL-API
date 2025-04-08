import mongoose, { ObjectId } from "mongoose";
import { roleEnum } from "../interfaces/user.interface";

export interface UserDocument extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role?: roleEnum;
  refreshToken?: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "MEMBER",
  },
  refreshToken: { type: String },
});

const User = mongoose.model("User", UserSchema);
export default User;
