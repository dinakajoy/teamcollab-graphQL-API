"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectController = exports.updateProjectController = exports.getProjectmController = exports.getProjectsController = exports.createProjectController = void 0;
const project_service_js_1 = require("./project.service.js");
const errors_js_1 = require("../../utils/errors.js");
const logger_js_1 = __importDefault(require("../../utils/logger.js"));
const createProjectController = async (name, description, team) => {
    try {
        const existingProject = await (0, project_service_js_1.getProjectByName)(name);
        if (existingProject)
            throw new errors_js_1.CustomException(400, "Project already exists!");
        return await (0, project_service_js_1.createProject)({ name, description, team });
    }
    catch (error) {
        logger_js_1.default.error("addProjectController - Error adding project:", error);
        throw new errors_js_1.CustomException(500, "Failed to add project");
    }
};
exports.createProjectController = createProjectController;
const getProjectsController = async () => {
    try {
        return await (0, project_service_js_1.getProjects)();
    }
    catch (error) {
        logger_js_1.default.error("getProjectsController - Failed to fetch projects:", error);
        return [];
    }
};
exports.getProjectsController = getProjectsController;
const getProjectmController = async (id) => {
    try {
        return await (0, project_service_js_1.getProjectById)(id);
    }
    catch (error) {
        logger_js_1.default.error("getProjectController - Error getting project:", error);
        throw new errors_js_1.CustomException(500, "Failed to get project");
    }
};
exports.getProjectmController = getProjectmController;
const updateProjectController = async (id, name, description, team, members) => {
    try {
        const existingProject = await (0, project_service_js_1.getProjectById)(id);
        if (!existingProject)
            throw new Error("Project don't exist");
        const project = await (0, project_service_js_1.updateProject)({
            id,
            name,
            description,
            team,
            members,
        });
        return project;
    }
    catch (error) {
        logger_js_1.default.error("updateProjectController - Error updating project:", error);
        throw new errors_js_1.CustomException(500, "Failed to update project");
    }
};
exports.updateProjectController = updateProjectController;
const deleteProjectController = async (id) => {
    try {
        const existingProject = await (0, project_service_js_1.getProjectById)(id);
        if (!existingProject)
            throw new Error("Project don't exist");
        await (0, project_service_js_1.deleteProjectById)(id);
        return "Project deleted successfully";
    }
    catch (error) {
        logger_js_1.default.error("deleteProjectController - Error deleting project:", error);
        throw new errors_js_1.CustomException(500, "Failed to delete project");
    }
};
exports.deleteProjectController = deleteProjectController;
