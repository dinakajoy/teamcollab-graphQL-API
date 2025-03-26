import jwt from "jsonwebtoken";
import { Request } from "express";

export const authMiddleware = (req: Request) => {
  const token = req.headers.authorization || "";
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return null;
  }
};
