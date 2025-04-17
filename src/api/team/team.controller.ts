import { Types } from "mongoose";
import {
  getTeams,
  getTeamById,
  createTeam,
  getTeamByName,
  updateTeam,
  deleteTeamById,
} from "./team.service";
import { CustomException } from "../../utils/errors";
import logger from "../../utils/logger";

export const createTeamController = async (
  name: string,
  description: string
) => {
  try {
    const existingTeam = await getTeamByName(name);
    if (existingTeam) throw new CustomException(400, "Team already exists!");

    return await createTeam({ name, description });
  } catch (error) {
    logger.error("createTeamController - Error adding team:", error);
    throw new CustomException(500, "Failed to add team");
  }
};

export const getTeamsController = async () => {
  try {
    return await getTeams();
  } catch (error) {
    logger.error("getTeamsController - Failed to fetch teams:", error);
    return [];
  }
};

export const getTeamController = async (id: Types.ObjectId) => {
  try {
    return await getTeamById(id);
  } catch (error) {
    logger.error("getTeamController - Error getting team:", error);
    throw new CustomException(500, "Failed to get team");
  }
};

export const updateTeamController = async (
  id: Types.ObjectId,
  name: string,
  description: string,
  members: Types.ObjectId[]
) => {
  try {
    const existingTeam = await getTeamById(id);
    if (!existingTeam) throw new Error("Team don't exist");

    const team = await updateTeam({ id, name, description, members });

    return team;
  } catch (error) {
    logger.error("updateTeamController - Error updating team:", error);
    throw new CustomException(500, "Failed to update team");
  }
};

export const deleteTeamController = async (id: Types.ObjectId) => {
  try {
    const existingTeam = await getTeamById(id);
    if (!existingTeam) throw new Error("Team don't exist");

    await deleteTeamById(id);

    return "Team deleted successfully";
  } catch (error) {
    logger.error("deleteTeamController - Error deleting team:", error);
    throw new CustomException(500, "Failed to delete team");
  }
};
