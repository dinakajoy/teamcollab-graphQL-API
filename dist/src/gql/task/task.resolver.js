"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolver = void 0;
const auth_js_1 = require("../../middlewares/auth.js");
const task_controller_js_1 = require("../../api/task/task.controller.js");
const errors_js_1 = require("../../utils/errors.js");
const user_interface_js_1 = require("../../interfaces/user.interface.js");
exports.taskResolver = {
    Query: {
        tasks: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN]);
            return await (0, task_controller_js_1.getTasksController)(args.projectId);
        },
        task: async (_parent, args, { user, loaders }) => {
            if (!user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(user, [user_interface_js_1.roleEnum.ADMIN, user_interface_js_1.roleEnum.MANAGER]);
            return loaders.taskLoader.load(args.taskId);
        },
    },
    Mutation: {
        createTask: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN, user_interface_js_1.roleEnum.MANAGER]);
            const { title, description, projectId } = args;
            return await (0, task_controller_js_1.createTaskController)(title, description, projectId);
        },
        updateTask: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN, user_interface_js_1.roleEnum.MANAGER]);
            const { taskId, title, description, status, projectId } = args;
            return await (0, task_controller_js_1.updateTaskController)(taskId, title, description, status, projectId);
        },
        deleteTask: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN]);
            return await (0, task_controller_js_1.deleteTaskController)(args.taskId);
        },
    },
    Task: {
        project: async (task, _, { loaders }) => {
            if (!task.project) {
                return null;
            }
            return await loaders.projectLoader.load(task.project);
        },
    },
};
