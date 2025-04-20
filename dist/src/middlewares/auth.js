"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.authMiddleware = void 0;
const user_service_1 = require("../api/user/user.service");
const jwtUtils_1 = require("../utils/jwtUtils");
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../utils/logger"));
const authMiddleware = async (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return null;
    if (authHeader) {
        const token = authHeader.split(" ")[1] || authHeader;
        try {
            const decodedToken = (await (0, jwtUtils_1.verifyToken)({
                token,
                isRefreshToken: false,
            }));
            const user = await (0, user_service_1.getUserById)(decodedToken.payload.tokenInfo._id);
            if (!user) {
                logger_1.default.warn("authMiddleware - User not found for decoded token");
                return null;
            }
            return user;
        }
        catch (err) {
            logger_1.default.warn("authMiddleware - Invalid or expired token");
            return null;
        }
    }
    return null;
};
exports.authMiddleware = authMiddleware;
const checkRole = async (user, roles, isUser = false) => {
    if (!user)
        throw new Error(errors_1.NotFoundUserException);
    const savedUser = await (0, user_service_1.getUserById)(user._id);
    if (isUser) {
    }
    if (savedUser && !roles.includes(savedUser.role))
        throw new errors_1.UnauthorizedUserException();
};
exports.checkRole = checkRole;
