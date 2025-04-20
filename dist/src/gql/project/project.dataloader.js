"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const project_1 = __importDefault(require("../../models/project"));
const createProjectLoader = () => new dataloader_1.default(async (projectIds) => {
    const projects = await project_1.default.find({ _id: { $in: projectIds } });
    const projectMap = new Map(projects.map((project) => [project._id.toString(), project]));
    return projectIds.map((id) => projectMap.get(id.toString()) || null);
});
exports.default = createProjectLoader;
