"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_resolver_js_1 = require("./user/user.resolver.js");
const auth_resolver_js_1 = require("./auth/auth.resolver.js");
const team_resolver_js_1 = require("./team/team.resolver.js");
const project_resolver_js_1 = require("./project/project.resolver.js");
const task_resolver_js_1 = require("./task/task.resolver.js");
exports.default = (0, merge_1.mergeResolvers)([
    user_resolver_js_1.userResolver,
    auth_resolver_js_1.authResolver,
    team_resolver_js_1.teamResolver,
    project_resolver_js_1.projectResolver,
    task_resolver_js_1.taskResolver,
]);
