"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_resolver_1 = require("./user/user.resolver");
const auth_resolver_1 = require("./auth/auth.resolver");
const team_resolver_1 = require("./team/team.resolver");
const project_resolver_1 = require("./project/project.resolver");
const task_resolver_1 = require("./task/task.resolver");
exports.default = (0, merge_1.mergeResolvers)([
    user_resolver_1.userResolver,
    auth_resolver_1.authResolver,
    team_resolver_1.teamResolver,
    project_resolver_1.projectResolver,
    task_resolver_1.taskResolver,
]);
