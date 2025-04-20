"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const team_js_1 = __importDefault(require("../../models/team.js"));
const createTeamLoader = () => new dataloader_1.default(async (teamIds) => {
    const teams = await team_js_1.default.find({ _id: { $in: teamIds } });
    const teamMap = new Map(teams.map((team) => [team._id.toString(), team]));
    return teamIds.map((id) => teamMap.get(id.toString()) || null);
});
exports.default = createTeamLoader;
