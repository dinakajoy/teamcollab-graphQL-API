import { Types } from "mongoose";
import Team from "../../models/team";
import { CustomException } from "../../utils/errors";
import logger from "../../utils/logger";
import { ITeam } from "../../interfaces/team.interface";

export const createTeam = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const team = new Team({ name, description });
    await team.save();
    return team.toObject();
  } catch (error) {
    logger.error("Error adding team:", error);
    throw new CustomException(500, "Failed to add team");
  }
};

export const getTeams = async (): Promise<ITeam[]> => {
  try {
    const teams = await Team.find().lean<ITeam[]>();
    return teams;
  } catch (error) {
    logger.error("Failed to fetch teams:", error);
    return [];
  }
};

export const getTeamById = async (
  id: Types.ObjectId
): Promise<ITeam | null> => {
  try {
    return await Team.findById(id).lean<ITeam>();
  } catch (error) {
    logger.error("Error getting team by ID:", error);
    throw new CustomException(500, "Failed to get team by ID");
  }
};

export const getTeamByName = async (name: string): Promise<ITeam | null> => {
  try {
    return await Team.findOne({ name }).select(["-members"]).lean<ITeam>();
  } catch (error) {
    logger.error("Error getting team by name:", error);
    throw new CustomException(500, "Failed to get team by name");
  }
};

export const updateTeam = async ({
  id,
  name,
  description,
  members,
}: {
  id: Types.ObjectId;
  name: string;
  description: string;
  members: Types.ObjectId[];
}) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(members && { members }),
      },
      { new: true }
    );
    if (updatedTeam) {
      return await getTeamById(id);
    }
    return null;
  } catch (error) {
    logger.error("Error updating team:", error);
    throw new CustomException(500, "Failed to update team");
  }
};

export const deleteTeamById = async (id: Types.ObjectId) => {
  try {
    return await Team.findByIdAndDelete(id);
  } catch (error) {
    logger.error("Error deleting team:", error);
    throw new CustomException(500, "Failed to delete team");
  }
};
