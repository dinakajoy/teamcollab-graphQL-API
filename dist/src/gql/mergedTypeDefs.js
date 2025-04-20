"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_typeDef_1 = require("./user/user.typeDef");
const auth_typeDef_1 = require("./auth/auth.typeDef");
const team_typeDef_1 = require("./team/team.typeDef");
const project_typeDef_1 = require("./project/project.typeDef");
const task_typeDef_1 = require("./task/task.typeDef");
exports.default = (0, merge_1.mergeTypeDefs)([
    user_typeDef_1.userTypeDefs,
    auth_typeDef_1.authTypeDefs,
    team_typeDef_1.teamTypeDefs,
    project_typeDef_1.projectTypeDefs,
    task_typeDef_1.taskTypeDefs,
]);
