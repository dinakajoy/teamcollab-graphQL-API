"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.logoutController = exports.loginController = void 0;
const user_1 = __importDefault(require("../../models/user"));
const jwtUtils_1 = require("../../utils/jwtUtils");
const bcryptUtils_1 = require("../../utils/bcryptUtils");
const logger_1 = __importDefault(require("../../utils/logger"));
const errors_1 = require("../../utils/errors");
const user_service_1 = require("../user/user.service");
const user_interface_1 = require("../../interfaces/user.interface");
const loginController = async (res, email, password) => {
    try {
        const user = await user_1.default.findOne({ email }).lean();
        if (!user || !user.password)
            throw new Error("User not found");
        const validPassword = await (0, bcryptUtils_1.compareStrings)(password, user.password);
        if (!validPassword)
            throw new Error("Incorrect password");
        const tokenInfo = {
            _id: user._id,
            role: user.role || user_interface_1.roleEnum.MEMBER,
        };
        const accessToken = await (0, jwtUtils_1.signToken)({
            tokenInfo,
            isRefreshToken: false,
        });
        const refreshToken = await (0, jwtUtils_1.signToken)({
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
        const hashedRefreshToken = await (0, bcryptUtils_1.hashString)(refreshToken);
        await (0, user_service_1.updateUser)({
            ...user,
            id: user._id,
            refreshToken: hashedRefreshToken,
        });
        delete user.password;
        return { ...user, token: accessToken };
    }
    catch (error) {
        logger_1.default.error("loginController - Login error:", error);
        throw new errors_1.CustomException(500, "Failed to login");
    }
};
exports.loginController = loginController;
const logoutController = async (res, id) => {
    try {
        res.clearCookie("refresh_token", {
            path: "/refresh_token",
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        await user_1.default.findByIdAndUpdate(id, { refreshToken: null });
        return "Logged out successfully";
    }
    catch (error) {
        logger_1.default.error("logoutController - Logout error:", error);
        throw new errors_1.CustomException(500, "Failed to logout");
    }
};
exports.logoutController = logoutController;
const refreshTokenController = async (req, res) => {
    const token = req.cookies.refresh_token;
    if (!token) {
        res.send({ ok: false, accessToken: "" });
        return;
    }
    try {
        const decodedToken = await (0, jwtUtils_1.verifyToken)(token);
        const user = await (0, user_service_1.getUserById)(decodedToken.payload._id);
        if (!user) {
            res.send("User not found");
            return;
        }
        if (!user.refreshToken) {
            res.send("Refresh token not found");
            return;
        }
        const validToken = await (0, bcryptUtils_1.compareStrings)(token, user.refreshToken);
        if (!validToken) {
            res.send({ ok: false, accessToken: "" });
            return;
        }
        const tokenInfo = {
            _id: user._id,
            role: user.role,
        };
        const accessToken = await (0, jwtUtils_1.signToken)({
            tokenInfo,
            isRefreshToken: false,
        });
        res.send({ ok: true, accessToken });
        return;
    }
    catch (err) {
        res.send({ ok: false, accessToken: "" });
        return;
    }
};
exports.refreshTokenController = refreshTokenController;
