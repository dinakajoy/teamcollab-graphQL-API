import { Types } from "mongoose";
import {
  getProjects,
  getProjectById,
  createProject,
  getProjectByName,
  updateProject,
  deleteProjectById,
} from "./project.service";
import { CustomException } from "../../utils/errors";
import logger from "../../utils/logger";

export const createProjectController = async (
  name: string,
  description: string,
  team: Types.ObjectId
) => {
  try {
    const existingProject = await getProjectByName(name);
    if (existingProject)
      throw new CustomException(400, "Project already exists!");

    return await createProject({ name, description, team });
  } catch (error) {
    logger.error("addProjectController - Error adding project:", error);
    throw new CustomException(500, "Failed to add project");
  }
};

export const getProjectsController = async () => {
  try {
    return await getProjects();
  } catch (error) {
    logger.error("getProjectsController - Failed to fetch projects:", error);
    return [];
  }
};

export const getProjectmController = async (id: Types.ObjectId) => {
  try {
    return await getProjectById(id);
  } catch (error) {
    logger.error("getProjectController - Error getting project:", error);
    throw new CustomException(500, "Failed to get project");
  }
};

export const updateProjectController = async (
  id: Types.ObjectId,
  name: string,
  description: string,
  team: Types.ObjectId,
  members: Types.ObjectId[]
) => {
  try {
    const existingProject = await getProjectById(id);
    if (!existingProject) throw new Error("Project don't exist");

    const project = await updateProject({
      id,
      name,
      description,
      team,
      members,
    });

    return project;
  } catch (error) {
    logger.error("updateProjectController - Error updating project:", error);
    throw new CustomException(500, "Failed to update project");
  }
};

export const deleteProjectController = async (id: Types.ObjectId) => {
  try {
    const existingProject = await getProjectById(id);
    if (!existingProject) throw new Error("Project don't exist");

    await deleteProjectById(id);

    return "Project deleted successfully";
  } catch (error) {
    logger.error("deleteProjectController - Error deleting project:", error);
    throw new CustomException(500, "Failed to delete project");
  }
};
