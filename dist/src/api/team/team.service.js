"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamById = exports.updateTeam = exports.getTeamByName = exports.getTeamById = exports.getTeams = exports.createTeam = void 0;
const team_1 = __importDefault(require("../../models/team"));
const errors_1 = require("../../utils/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
const createTeam = async ({ name, description, }) => {
    try {
        const team = new team_1.default({ name, description });
        await team.save();
        return team.toObject();
    }
    catch (error) {
        logger_1.default.error("Error adding team:", error);
        throw new errors_1.CustomException(500, "Failed to add team");
    }
};
exports.createTeam = createTeam;
const getTeams = async () => {
    try {
        const teams = await team_1.default.find().lean();
        return teams;
    }
    catch (error) {
        logger_1.default.error("Failed to fetch teams:", error);
        return [];
    }
};
exports.getTeams = getTeams;
const getTeamById = async (id) => {
    try {
        return await team_1.default.findById(id).lean();
    }
    catch (error) {
        logger_1.default.error("Error getting team by ID:", error);
        throw new errors_1.CustomException(500, "Failed to get team by ID");
    }
};
exports.getTeamById = getTeamById;
const getTeamByName = async (name) => {
    try {
        return await team_1.default.findOne({ name }).select(["-members"]).lean();
    }
    catch (error) {
        logger_1.default.error("Error getting team by name:", error);
        throw new errors_1.CustomException(500, "Failed to get team by name");
    }
};
exports.getTeamByName = getTeamByName;
const updateTeam = async ({ id, name, description, members, }) => {
    try {
        const updatedTeam = await team_1.default.findByIdAndUpdate(id, {
            ...(name && { name }),
            ...(description && { description }),
            ...(members && { members }),
        }, { new: true });
        if (updatedTeam) {
            return await (0, exports.getTeamById)(id);
        }
        return null;
    }
    catch (error) {
        logger_1.default.error("Error updating team:", error);
        throw new errors_1.CustomException(500, "Failed to update team");
    }
};
exports.updateTeam = updateTeam;
const deleteTeamById = async (id) => {
    try {
        return await team_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        logger_1.default.error("Error deleting team:", error);
        throw new errors_1.CustomException(500, "Failed to delete team");
    }
};
exports.deleteTeamById = deleteTeamById;
