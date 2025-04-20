"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const auth_js_1 = require("../../middlewares/auth.js");
const user_controller_js_1 = require("../../api/user/user.controller.js");
const errors_js_1 = require("../../utils/errors.js");
const user_interface_js_1 = require("../../interfaces/user.interface.js");
exports.userResolver = {
    Query: {
        users: async (_parent, _args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN]);
            return await (0, user_controller_js_1.getUsersController)();
        },
        user: async (_parent, args, context) => {
            const { user } = context;
            if (!user)
                throw new errors_js_1.NotFoundUserException();
            return await (0, user_controller_js_1.getUserController)(args.userId);
        },
        currentUser: async (_parent, _args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            return await (0, user_controller_js_1.getUserController)(context.user._id);
        },
    },
    Mutation: {
        addUser: async (_parent, args) => {
            const { name, email, password } = args;
            return await (0, user_controller_js_1.addUserController)(name, email, password);
        },
        updateUser: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            const { userId, name, email, role } = args;
            return await (0, user_controller_js_1.updateUserController)(userId, name, email, role);
        },
        deleteUser: async (_parent, args, context) => {
            if (!context.user)
                throw new errors_js_1.NotFoundUserException();
            (0, auth_js_1.checkRole)(context.user, [user_interface_js_1.roleEnum.ADMIN]);
            return await (0, user_controller_js_1.deleteUserController)(args.userId);
        },
    },
    User: {
        teams: async (user, _, { loaders }) => {
            if (!user.teams || user.teams.length === 0) {
                return [];
            }
            return await loaders.teamLoader.loadMany(user.teams);
        },
    },
};
