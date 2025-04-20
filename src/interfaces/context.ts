import { Request, Response } from "express";
import { Types } from "mongoose";
import DataLoader from "dataloader";
import { UserDocument } from "../models/user.js";
import { TeamDocument } from "../models/team.js";
import { ProjectDocument } from "../models/project.js";
import { TaskDocument } from "../models/task.js";
import { IUser } from "./user.interface.js";

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
