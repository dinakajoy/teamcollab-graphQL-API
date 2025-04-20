import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "./logger.js";
import { CustomException, ServerErrorException } from "./errors.js";
import { ICreateToken, IVerifyToken } from "../interfaces/user.interface.js";

const accessTokenSecret = config.get("jwt.accessTokenSecret") as string;
const refreshTokenSecret = config.get("jwt.refreshTokenSecret") as string;

export const signPasswordAccessToken = (payload: {
  email: string;
}): Promise<string | undefined> =>
  new Promise((resolve, _) => {
    jwt.sign(
      { payload },
      accessTokenSecret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          logger.error(`signAccessToken Error: ${err.message}`);
          throw new ServerErrorException();
        }
        resolve(token);
      }
    );
  });

export const signToken = (payload: ICreateToken): Promise<string> =>
  new Promise((resolve, _) => {
    jwt.sign(
      { payload },
      payload.isRefreshToken ? refreshTokenSecret : accessTokenSecret,
      { expiresIn: payload.isRefreshToken ? "7d" : "1d" },
      (err, token) => {
        if (err) {
          logger.error(`signToken Error: ${err.message}`);
          throw new ServerErrorException();
        }
        resolve(token as string);
      }
    );
  });

export const verifyToken = (tokenData: IVerifyToken): Promise<JwtPayload> =>
  new Promise((resolve, _) => {
    try {
      const jwtRespone = jwt.verify(
        tokenData.token,
        tokenData.isRefreshToken ? refreshTokenSecret : accessTokenSecret
      ) as JwtPayload;
      resolve(jwtRespone);
    } catch (err: any) {
      logger.error(`verifyToken Error: ${err.message}`);
      throw new CustomException(500, err.message);
    }
  });
