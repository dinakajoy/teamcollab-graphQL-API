"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const user_1 = __importDefault(require("../../models/user"));
const createUserLoader = () => new dataloader_1.default(async (userIds) => {
    const users = await user_1.default.find({ _id: { $in: userIds } });
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    return userIds.map((id) => userMap.get(id.toString()) || null);
});
exports.default = createUserLoader;
