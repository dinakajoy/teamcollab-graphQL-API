"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskController = exports.updateTaskController = exports.getTaskController = exports.getTasksController = exports.createTaskController = void 0;
const task_service_1 = require("./task.service");
const errors_1 = require("../../utils/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
const createTaskController = async (title, description, project) => {
    try {
        const existingTask = await (0, task_service_1.getTaskByTitle)(title);
        if (existingTask)
            throw new errors_1.CustomException(400, "Task already exists!");
        return await (0, task_service_1.createTask)({ title, description, project });
    }
    catch (error) {
        logger_1.default.error("addTaskController - Error adding task:", error);
        throw new errors_1.CustomException(500, "Failed to add task");
    }
};
exports.createTaskController = createTaskController;
const getTasksController = async (projectId) => {
    try {
        return await (0, task_service_1.getTasks)(projectId);
    }
    catch (error) {
        logger_1.default.error("getTasksController - Failed to fetch tasks:", error);
        return [];
    }
};
exports.getTasksController = getTasksController;
const getTaskController = async (id) => {
    try {
        return await (0, task_service_1.getTaskById)(id);
    }
    catch (error) {
        logger_1.default.error("getTaskController - Error getting task:", error);
        throw new errors_1.CustomException(500, "Failed to get task");
    }
};
exports.getTaskController = getTaskController;
const updateTaskController = async (id, title, description, status, project) => {
    try {
        const existingTask = await (0, task_service_1.getTaskById)(id);
        if (!existingTask)
            throw new Error("Task don't exist");
        const task = await (0, task_service_1.updateTask)({
            id,
            title,
            description,
            status,
            project,
        });
        return task;
    }
    catch (error) {
        logger_1.default.error("updateTaskController - Error updating task:", error);
        throw new errors_1.CustomException(500, "Failed to update task");
    }
};
exports.updateTaskController = updateTaskController;
const deleteTaskController = async (id) => {
    try {
        const existingTask = await (0, task_service_1.getTaskById)(id);
        if (!existingTask)
            throw new Error("Task don't exist");
        await (0, task_service_1.deleteTaskById)(id);
        return "Task deleted successfully";
    }
    catch (error) {
        logger_1.default.error("deleteTaskController - Error deleting task:", error);
        throw new errors_1.CustomException(500, "Failed to delete task");
    }
};
exports.deleteTaskController = deleteTaskController;
