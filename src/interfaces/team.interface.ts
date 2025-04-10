import { Types } from "mongoose";

export interface ITeam {
  _id: Types.ObjectId;
  name: string;
  descripyion: string;
  members: Types.ObjectId[];
}
