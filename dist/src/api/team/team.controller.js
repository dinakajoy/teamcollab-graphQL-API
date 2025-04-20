"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamController = exports.updateTeamController = exports.getTeamController = exports.getTeamsController = exports.createTeamController = void 0;
const team_service_js_1 = require("./team.service.js");
const errors_js_1 = require("../../utils/errors.js");
const logger_js_1 = __importDefault(require("../../utils/logger.js"));
const createTeamController = async (name, description) => {
    try {
        const existingTeam = await (0, team_service_js_1.getTeamByName)(name);
        if (existingTeam)
            throw new errors_js_1.CustomException(400, "Team already exists!");
        return await (0, team_service_js_1.createTeam)({ name, description });
    }
    catch (error) {
        logger_js_1.default.error("createTeamController - Error adding team:", error);
        throw new errors_js_1.CustomException(500, "Failed to add team");
    }
};
exports.createTeamController = createTeamController;
const getTeamsController = async () => {
    try {
        return await (0, team_service_js_1.getTeams)();
    }
    catch (error) {
        logger_js_1.default.error("getTeamsController - Failed to fetch teams:", error);
        return [];
    }
};
exports.getTeamsController = getTeamsController;
const getTeamController = async (id) => {
    try {
        return await (0, team_service_js_1.getTeamById)(id);
    }
    catch (error) {
        logger_js_1.default.error("getTeamController - Error getting team:", error);
        throw new errors_js_1.CustomException(500, "Failed to get team");
    }
};
exports.getTeamController = getTeamController;
const updateTeamController = async (id, name, description, members) => {
    try {
        const existingTeam = await (0, team_service_js_1.getTeamById)(id);
        if (!existingTeam)
            throw new Error("Team don't exist");
        const team = await (0, team_service_js_1.updateTeam)({ id, name, description, members });
        return team;
    }
    catch (error) {
        logger_js_1.default.error("updateTeamController - Error updating team:", error);
        throw new errors_js_1.CustomException(500, "Failed to update team");
    }
};
exports.updateTeamController = updateTeamController;
const deleteTeamController = async (id) => {
    try {
        const existingTeam = await (0, team_service_js_1.getTeamById)(id);
        if (!existingTeam)
            throw new Error("Team don't exist");
        await (0, team_service_js_1.deleteTeamById)(id);
        return "Team deleted successfully";
    }
    catch (error) {
        logger_js_1.default.error("deleteTeamController - Error deleting team:", error);
        throw new errors_js_1.CustomException(500, "Failed to delete team");
    }
};
exports.deleteTeamController = deleteTeamController;
