import { Request } from "express";
import { getUserById } from "../api/user/user.service.js";
import { verifyToken } from "../utils/jwtUtils.js";
import {
  CustomException,
  NotFoundUserException,
  UnauthorizedUserException,
  WrongCredentialsException,
} from "../utils/errors.js";
import {
  IDecodedToken,
  IUser,
  roleEnum,
} from "../interfaces/user.interface.js";

export const authMiddleware = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1] || authHeader;
    try {
      const decodedToken = (await verifyToken({
        token,
        isRefreshToken: false,
      })) as IDecodedToken;

      const user = await getUserById(decodedToken.tokenInfo._id);
      if (!user) throw new Error(WrongCredentialsException as any);
      return user;
    } catch (err) {
      throw new (CustomException as any)(500, "Invalid or expired token");
    }
  }
  return null;
};

export const checkRole = async (user: IUser, roles: roleEnum[]) => {
  if (!user) throw new Error(NotFoundUserException as any);
  const savedUser = await getUserById(user._id);
  if (savedUser && !roles.includes(savedUser.role))
    throw new (UnauthorizedUserException as any)();
};
