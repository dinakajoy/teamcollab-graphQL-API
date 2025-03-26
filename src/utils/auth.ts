import { Request } from "express";
import { verifyAccessToken } from "./jwtUtils";

export const authMiddleware = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      return verifyAccessToken(token);
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
  return null;
};

export const checkRole = (user, roles) => {
  if (!user) throw new Error("Not authenticated");
  if (!roles.includes(user.role)) throw new Error("Not authorized");
};
