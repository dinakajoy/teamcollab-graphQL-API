import config from "config";
import bcrypt from "bcryptjs";
import logger from "./logger.js";
import { ServerErrorException } from "./errors.js";

const saltGen = config.get("dbConfig.saltWorkFactor") as number;

export const hashString = (string: string) =>
  new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltGen, (err, salt) => {
      bcrypt.hash(string, salt as string, (error, hash) => {
        if (error) {
          logger.error(error.message);
          throw new (ServerErrorException as any)();
        }
        resolve(hash as string);
      });
    });
  });

export const compareStrings = (string: string, hashedString: string) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(string, hashedString, (err, res) => {
      if (err) {
        logger.error(err.message);
        throw new (ServerErrorException as any)();
      }
      resolve(res);
    });
  });
