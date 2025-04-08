import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";

export interface ITeam {
  _id: ObjectId;
  name: string;
  descripyion: string;
  members: IUser[];
}
