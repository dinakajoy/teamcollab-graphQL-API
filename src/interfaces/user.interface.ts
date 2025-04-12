import { Types } from "mongoose";

export enum roleEnum {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: roleEnum;
  password?: string;
  refreshToken?: string;
}

export interface IUserInfo {
  _id: Types.ObjectId;
  role: roleEnum;
}

export interface ICreateToken {
  tokenInfo: IUserInfo;
  isRefreshToken: boolean;
}

export interface IVerifyToken {
  token: string;
  isRefreshToken: boolean;
}

export interface IDecodedToken {
  tokenInfo: IUserInfo;
  iat: number;
  exp: number;
}
