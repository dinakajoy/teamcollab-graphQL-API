import { ObjectId } from "mongoose";

export enum roleEnum {
  "ADMIN",
  "MANAGER",
  "MEMBER",
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  role: roleEnum;
  password?: string;
  refreshToken?: string;
}

export interface IUserInfo {
  _id: ObjectId;
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
  payload: IUserInfo;
  iat: number;
  exp: number;
}
