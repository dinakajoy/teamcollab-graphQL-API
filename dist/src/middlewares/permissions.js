"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const user_interface_js_1 = require("../interfaces/user.interface.js");
const isAuthenticated = (0, graphql_shield_1.rule)()(async (_, __, { user }) => !!user);
const isAdmin = (0, graphql_shield_1.rule)()(async (_, __, { user }) => user?.role === user_interface_js_1.roleEnum.ADMIN);
const isManager = (0, graphql_shield_1.rule)()(async (_, __, { user }) => user?.role === user_interface_js_1.roleEnum.MANAGER);
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        users: isAdmin,
        user: isAuthenticated,
        currentUser: isAuthenticated,
        teams: isAdmin,
        team: isAdmin,
        tasks: isAdmin,
        task: (0, graphql_shield_1.and)(isAdmin, isManager),
        projects: isAdmin,
        project: (0, graphql_shield_1.and)(isAdmin, isManager),
    },
    Mutation: {
        addUser: graphql_shield_1.allow,
        updateUser: graphql_shield_1.allow,
        deleteUser: isAdmin,
        login: graphql_shield_1.allow,
        logout: graphql_shield_1.allow,
        createTeam: isAdmin,
        updateTeam: isAdmin,
        deleteTeam: isAdmin,
        createTask: (0, graphql_shield_1.and)(isAdmin, isManager),
        updateTask: (0, graphql_shield_1.and)(isAdmin, isManager),
        deleteTask: isAdmin,
        createProject: (0, graphql_shield_1.and)(isAdmin, isManager),
        updateProject: (0, graphql_shield_1.and)(isAdmin, isManager),
        deleteProject: isAdmin,
    },
}, {
    allowExternalErrors: true,
    debug: true,
});
