import { Request, Response } from "express";
import { IUser } from "./user.interface";
import { Types } from "mongoose";
import DataLoader from "dataloader";
import { UserDocument } from "../models/user";
import { TeamDocument } from "../models/team";
import { ProjectDocument } from "../models/project";
import { TaskDocument } from "../models/task";

export interface DataLoaders {
  userLoader: DataLoader<Types.ObjectId, UserDocument | null>;
  teamLoader: DataLoader<Types.ObjectId, TeamDocument | null>;
  projectLoader: DataLoader<Types.ObjectId, ProjectDocument | null>;
  taskLoader: DataLoader<Types.ObjectId, TaskDocument | null>;
}

export interface MyContext {
  user: IUser | null;
  req: Request;
  res: Response;
  loaders: DataLoaders;
}
