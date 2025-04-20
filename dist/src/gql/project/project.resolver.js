"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectResolver = void 0;
const auth_1 = require("../../middlewares/auth");
const project_controller_1 = require("../../api/project/project.controller");
const errors_1 = require("../../utils/errors");
const user_interface_1 = require("../../interfaces/user.interface");
exports.projectResolver = {
    Query: {
        projects: async (_parent, _args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            return await (0, project_controller_1.getProjectsController)();
        },
        project: async (_parent, args, { user, loaders }) => {
            if (!user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(user, [user_interface_1.roleEnum.ADMIN, user_interface_1.roleEnum.MANAGER]);
            return loaders.projectLoader.load(args.projectId);
        },
    },
    Mutation: {
        createProject: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN, user_interface_1.roleEnum.MANAGER]);
            const { name, description, teamId } = args;
            return await (0, project_controller_1.createProjectController)(name, description, teamId);
        },
        updateProject: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN, user_interface_1.roleEnum.MANAGER]);
            const { projectId, name, description, teamId, membersId } = args;
            return await (0, project_controller_1.updateProjectController)(projectId, name, description, teamId, membersId);
        },
        deleteProject: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            return await (0, project_controller_1.deleteProjectController)(args.projectId);
        },
    },
    Project: {
        team: async (project, _, { loaders }) => {
            if (!project.team || project.team.length === 0) {
                return [];
            }
            return await loaders.teamLoader.loadMany(project.team);
        },
        tasks: async (project, _, { loaders }) => {
            if (!project.tasks || project.tasks.length === 0) {
                return [];
            }
            return await loaders.taskLoader.loadMany(project.tasks);
        },
    },
};
