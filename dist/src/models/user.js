"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_js_1 = require("../interfaces/user.interface.js");
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_js_1.roleEnum),
        default: user_interface_js_1.roleEnum.MEMBER,
    },
    refreshToken: { type: String },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
