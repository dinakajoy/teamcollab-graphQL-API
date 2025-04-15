import { Request } from "express";
import { getUserById } from "../api/user/user.service.js";
import { verifyToken } from "../utils/jwtUtils.js";
import {
  NotFoundUserException,
  UnauthorizedUserException,
} from "../utils/errors.js";
import {
  IDecodedToken,
  IUser,
  roleEnum,
} from "../interfaces/user.interface.js";
import logger from "../utils/logger.js";

export const authMiddleware = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  if (authHeader) {
    const token = authHeader.split(" ")[1] || authHeader;
    try {
      const decodedToken = (await verifyToken({
        token,
        isRefreshToken: false,
      })) as IDecodedToken;

      const user = await getUserById(decodedToken.payload.tokenInfo._id);
      if (!user) {
        logger.warn("authMiddleware - User not found for decoded token");
        return null;
      }

      return user;
    } catch (err) {
      logger.warn("authMiddleware - Invalid or expired token");
      return null;
    }
  }

  return null;
};

export const checkRole = async (user: IUser, roles: roleEnum[], isUser = false) => {
  if (!user) throw new Error(NotFoundUserException as any);
  const savedUser = await getUserById(user._id);
  if(isUser) {

  }
  if (savedUser && !roles.includes(savedUser.role))
    throw new UnauthorizedUserException();
};
