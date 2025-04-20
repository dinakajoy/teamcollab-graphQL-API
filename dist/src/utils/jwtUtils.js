"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.signPasswordAccessToken = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
const errors_1 = require("./errors");
const accessTokenSecret = config_1.default.get("jwt.accessTokenSecret");
const refreshTokenSecret = config_1.default.get("jwt.refreshTokenSecret");
const signPasswordAccessToken = (payload) => new Promise((resolve, _) => {
    jsonwebtoken_1.default.sign({ payload }, accessTokenSecret, { expiresIn: "1h" }, (err, token) => {
        if (err) {
            logger_1.default.error(`signAccessToken Error: ${err.message}`);
            throw new errors_1.ServerErrorException();
        }
        resolve(token);
    });
});
exports.signPasswordAccessToken = signPasswordAccessToken;
const signToken = (payload) => new Promise((resolve, _) => {
    jsonwebtoken_1.default.sign({ payload }, payload.isRefreshToken ? refreshTokenSecret : accessTokenSecret, { expiresIn: payload.isRefreshToken ? "7d" : "1d" }, (err, token) => {
        if (err) {
            logger_1.default.error(`signToken Error: ${err.message}`);
            throw new errors_1.ServerErrorException();
        }
        resolve(token);
    });
});
exports.signToken = signToken;
const verifyToken = (tokenData) => new Promise((resolve, _) => {
    try {
        const jwtRespone = jsonwebtoken_1.default.verify(tokenData.token, tokenData.isRefreshToken ? refreshTokenSecret : accessTokenSecret);
        resolve(jwtRespone);
    }
    catch (err) {
        logger_1.default.error(`verifyToken Error: ${err.message}`);
        throw new errors_1.CustomException(500, err.message);
    }
});
exports.verifyToken = verifyToken;
