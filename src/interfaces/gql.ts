import { db } from "../db/index.js";

export interface MyContext {
  user?: { id: string; role: string };
  db?: typeof db;
  token?: string;
}
