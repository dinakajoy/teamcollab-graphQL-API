"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const task_js_1 = __importDefault(require("../../models/task.js"));
const createTaskLoader = () => new dataloader_1.default(async (taskIds) => {
    const tasks = await task_js_1.default.find({ _id: { $in: taskIds } });
    const taskMap = new Map(tasks.map((task) => [task._id.toString(), task]));
    return taskIds.map((id) => taskMap.get(id.toString()) || null);
});
exports.default = createTaskLoader;
