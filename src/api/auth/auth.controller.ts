import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import User from "../../models/user.js"
import { signToken, verifyToken } from "../../utils/jwtUtils.js"
import { compareStrings, hashString } from "../../utils/bcryptUtils.js"
import logger from "../../utils/logger.js"
import { CustomException } from "../../utils/errors.js"
import { getUserById, updateUser } from "../user/user.service.js"
import { IUser } from "../../interfaces/user.interface.js"

export const loginController = async (
  res: Response,
  email: string,
  password: string
) => {
  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user || !user.password) throw new Error("User not found");

    const validPassword = await compareStrings(password, user.password);
    if (!validPassword) throw new Error("Incorrect password");

    const tokenInfo = {
      _id: user._id,
      role: user.role,
    };
    const accessToken: string = await signToken({
      tokenInfo,
      isRefreshToken: false,
    });
    const refreshToken = await signToken({
      tokenInfo,
      isRefreshToken: true,
    });

    // Save refresh token in cookies and DB
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const hashedRefreshToken = await hashString(refreshToken);
    await updateUser({
      ...user,
      id: user._id,
      refreshToken: hashedRefreshToken,
    });

    delete (user as any).password;

    return { ...user, token: accessToken };
  } catch (error) {
    logger.error("loginController - Login error:", error);
    throw new (CustomException as any)(500, "Failed to login");
  }
};

export const logoutController = async (res: Response, id: ObjectId) => {
  try {
    res.clearCookie("refresh_token", {
      path: "/refresh_token",
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    await User.findByIdAndUpdate(id, { refreshToken: null });

    return "Logged out successfully";
  } catch (error) {
    logger.error("logoutController - Logout error:", error);
    throw new (CustomException as any)(500, "Failed to logout");
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    res.send({ ok: false, accessToken: "" });
    return;
  }

  try {
    const decodedToken = await verifyToken(token);
    const user = await getUserById(decodedToken.payload._id);
    if (!user) {
      res.send("User not found");
      return;
    }
    if (!user.refreshToken) {
      res.send("Refresh token not found");
      return;
    }

    const validToken = await compareStrings(token, user.refreshToken);
    if (!validToken) {
      res.send({ ok: false, accessToken: "" });
      return;
    }

    const tokenInfo = {
      _id: user._id,
      role: user.role,
    };
    const accessToken = await signToken({
      tokenInfo,
      isRefreshToken: false,
    });

    res.send({ ok: true, accessToken });
    return;
  } catch (err) {
    res.send({ ok: false, accessToken: "" });
    return;
  }
};
