"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoaders = void 0;
const user_dataloader_1 = __importDefault(require("../gql/user/user.dataloader"));
const team_dataloader_1 = __importDefault(require("../gql/team/team.dataloader"));
const project_dataloader_1 = __importDefault(require("../gql/project/project.dataloader"));
const task_dataloader_1 = __importDefault(require("../gql/task/task.dataloader"));
const createLoaders = () => ({
    userLoader: (0, user_dataloader_1.default)(),
    teamLoader: (0, team_dataloader_1.default)(),
    projectLoader: (0, project_dataloader_1.default)(),
    taskLoader: (0, task_dataloader_1.default)(),
});
exports.createLoaders = createLoaders;
