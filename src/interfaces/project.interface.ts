import { Types } from "mongoose";

export interface IProject {
  name: string;
  description?: string;
  team?: Types.ObjectId[];
}
