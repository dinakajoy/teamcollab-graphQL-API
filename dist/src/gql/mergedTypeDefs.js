"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_typeDef_js_1 = require("./user/user.typeDef.js");
const auth_typeDef_js_1 = require("./auth/auth.typeDef.js");
const team_typeDef_js_1 = require("./team/team.typeDef.js");
const project_typeDef_js_1 = require("./project/project.typeDef.js");
const task_typeDef_js_1 = require("./task/task.typeDef.js");
exports.default = (0, merge_1.mergeTypeDefs)([
    user_typeDef_js_1.userTypeDefs,
    auth_typeDef_js_1.authTypeDefs,
    team_typeDef_js_1.teamTypeDefs,
    project_typeDef_js_1.projectTypeDefs,
    task_typeDef_js_1.taskTypeDefs,
]);
