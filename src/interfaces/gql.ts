import { Request, Response } from "express";
import { IUser } from "./user.interface.js";

export interface MyContext {
  user: IUser | null;
  req: Request;
  res: Response;
  // token?: string;
}
