import { Types } from "mongoose";
import Project from "../../models/project.js";
import { CustomException } from "../../utils/errors.js";
import logger from "../../utils/logger.js";
import { IProject } from "../../interfaces/project.interface.js";

export const createProject = async ({
  name,
  description,
  team,
}: {
  name: string;
  description: string;
  team: Types.ObjectId;
}) => {
  try {
    const project = new Project({ name, description, team });
    await project.save();
    return project.toObject();
  } catch (error) {
    logger.error("Error adding project:", error);
    throw new (CustomException as any)(500, "Failed to add project");
  }
};

export const getProjects = async (): Promise<IProject[]> => {
  try {
    const projects = await Project.find().lean<IProject[]>();
    return projects;
  } catch (error) {
    logger.error("Failed to fetch projects:", error);
    return [];
  }
};

export const getProjectById = async (
  id: Types.ObjectId
): Promise<IProject | null> => {
  try {
    return await Project.findById(id).lean<IProject>();
  } catch (error) {
    logger.error("Error getting project by ID:", error);
    throw new (CustomException as any)(500, "Failed to get project by ID");
  }
};

export const getProjectByName = async (
  name: string
): Promise<IProject | null> => {
  try {
    return await Project.findOne({ name })
      .select(["-members"])
      .lean<IProject>();
  } catch (error) {
    logger.error("Error getting project by name:", error);
    throw new (CustomException as any)(500, "Failed to get project by name");
  }
};

export const updateProject = async ({
  id,
  name,
  description,
  team,
  members,
}: {
  id: Types.ObjectId;
  name: string;
  description: string;
  team: Types.ObjectId;
  members: Types.ObjectId[];
}) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(team && { team }),
        ...(members && { members }),
      },
      { new: true }
    );
    if (updatedProject) {
      return await getProjectById(id);
    }
    return null;
  } catch (error) {
    logger.error("Error updating project:", error);
    throw new (CustomException as any)(500, "Failed to update project");
  }
};

export const deleteProjectById = async (id: Types.ObjectId) => {
  try {
    return await Project.findByIdAndDelete(id);
  } catch (error) {
    logger.error("Error deleting project:", error);
    throw new (CustomException as any)(500, "Failed to delete project");
  }
};
