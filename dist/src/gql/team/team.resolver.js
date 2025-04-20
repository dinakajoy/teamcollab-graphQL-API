"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamResolver = void 0;
const auth_1 = require("../../middlewares/auth");
const team_controller_1 = require("../../api/team/team.controller");
const errors_1 = require("../../utils/errors");
const user_interface_1 = require("../../interfaces/user.interface");
exports.teamResolver = {
    Query: {
        teams: async (_parent, _args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            return await (0, team_controller_1.getTeamsController)();
        },
        team: async (_parent, args, { user, loaders }) => {
            if (!user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(user, [user_interface_1.roleEnum.ADMIN]);
            return loaders.teamLoader.load(args.teamId);
        },
    },
    Mutation: {
        createTeam: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            const { name, description } = args;
            return await (0, team_controller_1.createTeamController)(name, description);
        },
        updateTeam: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            const { teamId, name, description, membersId } = args;
            return await (0, team_controller_1.updateTeamController)(teamId, name, description, membersId);
        },
        deleteTeam: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            (0, auth_1.checkRole)(context.user, [user_interface_1.roleEnum.ADMIN]);
            return await (0, team_controller_1.deleteTeamController)(args.teamId);
        },
    },
    Team: {
        members: async (team, _, { loaders }) => {
            if (!team.members || team.members.length === 0) {
                return [];
            }
            return await loaders.userLoader.loadMany(team.members);
        },
        projects: async (team, _, { loaders }) => {
            if (!team.projects || team.projects.length === 0) {
                return [];
            }
            return await loaders.projectLoader.loadMany(team.projects);
        },
    },
};
