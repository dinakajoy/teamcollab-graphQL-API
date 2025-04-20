"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const auth_controller_1 = require("../../api/auth/auth.controller");
const errors_1 = require("../../utils/errors");
exports.authResolver = {
    Mutation: {
        login: async (_parent, args, context) => {
            const loggedInUser = await (0, auth_controller_1.loginController)(context.res, args.email, args.password);
            return loggedInUser;
        },
        logout: async (_parent, _args, context) => {
            if (!context.user)
                throw new errors_1.NotFoundUserException();
            return await (0, auth_controller_1.logoutController)(context.res, context.user._id);
        },
    },
};
