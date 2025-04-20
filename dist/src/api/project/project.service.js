"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.updateProject = exports.getProjectByName = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const project_js_1 = __importDefault(require("../../models/project.js"));
const errors_js_1 = require("../../utils/errors.js");
const logger_js_1 = __importDefault(require("../../utils/logger.js"));
const createProject = async ({ name, description, team, }) => {
    try {
        const project = new project_js_1.default({ name, description, team });
        await project.save();
        return project.toObject();
    }
    catch (error) {
        logger_js_1.default.error("Error adding project:", error);
        throw new errors_js_1.CustomException(500, "Failed to add project");
    }
};
exports.createProject = createProject;
const getProjects = async () => {
    try {
        const projects = await project_js_1.default.find().lean();
        return projects;
    }
    catch (error) {
        logger_js_1.default.error("Failed to fetch projects:", error);
        return [];
    }
};
exports.getProjects = getProjects;
const getProjectById = async (id) => {
    try {
        return await project_js_1.default.findById(id).lean();
    }
    catch (error) {
        logger_js_1.default.error("Error getting project by ID:", error);
        throw new errors_js_1.CustomException(500, "Failed to get project by ID");
    }
};
exports.getProjectById = getProjectById;
const getProjectByName = async (name) => {
    try {
        return await project_js_1.default.findOne({ name })
            .select(["-members"])
            .lean();
    }
    catch (error) {
        logger_js_1.default.error("Error getting project by name:", error);
        throw new errors_js_1.CustomException(500, "Failed to get project by name");
    }
};
exports.getProjectByName = getProjectByName;
const updateProject = async ({ id, name, description, team, members, }) => {
    try {
        const updatedProject = await project_js_1.default.findByIdAndUpdate(id, {
            ...(name && { name }),
            ...(description && { description }),
            ...(team && { team }),
            ...(members && { members }),
        }, { new: true });
        if (updatedProject) {
            return await (0, exports.getProjectById)(id);
        }
        return null;
    }
    catch (error) {
        logger_js_1.default.error("Error updating project:", error);
        throw new errors_js_1.CustomException(500, "Failed to update project");
    }
};
exports.updateProject = updateProject;
const deleteProjectById = async (id) => {
    try {
        return await project_js_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        logger_js_1.default.error("Error deleting project:", error);
        throw new errors_js_1.CustomException(500, "Failed to delete project");
    }
};
exports.deleteProjectById = deleteProjectById;
