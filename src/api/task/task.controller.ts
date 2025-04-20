import { Types } from "mongoose";
import {
  getTasks,
  getTaskById,
  createTask,
  getTaskByTitle,
  updateTask,
  deleteTaskById,
} from "./task.service.js";
import { CustomException } from "../../utils/errors.js";
import logger from "../../utils/logger.js";
import { TaskStatusEnum } from "../../interfaces/task.interface.js";

export const createTaskController = async (
  title: string,
  description: string,
  project: Types.ObjectId
) => {
  try {
    const existingTask = await getTaskByTitle(title);
    if (existingTask) throw new CustomException(400, "Task already exists!");

    return await createTask({ title, description, project });
  } catch (error) {
    logger.error("addTaskController - Error adding task:", error);
    throw new CustomException(500, "Failed to add task");
  }
};

export const getTasksController = async (projectId: Types.ObjectId) => {
  try {
    return await getTasks(projectId);
  } catch (error) {
    logger.error("getTasksController - Failed to fetch tasks:", error);
    return [];
  }
};

export const getTaskController = async (id: Types.ObjectId) => {
  try {
    return await getTaskById(id);
  } catch (error) {
    logger.error("getTaskController - Error getting task:", error);
    throw new CustomException(500, "Failed to get task");
  }
};

export const updateTaskController = async (
  id: Types.ObjectId,
  title: string,
  description: string,
  status: TaskStatusEnum,
  project: Types.ObjectId
) => {
  try {
    const existingTask = await getTaskById(id);
    if (!existingTask) throw new Error("Task don't exist");

    const task = await updateTask({
      id,
      title,
      description,
      status,
      project,
    });

    return task;
  } catch (error) {
    logger.error("updateTaskController - Error updating task:", error);
    throw new CustomException(500, "Failed to update task");
  }
};

export const deleteTaskController = async (id: Types.ObjectId) => {
  try {
    const existingTask = await getTaskById(id);
    if (!existingTask) throw new Error("Task don't exist");

    await deleteTaskById(id);

    return "Task deleted successfully";
  } catch (error) {
    logger.error("deleteTaskController - Error deleting task:", error);
    throw new CustomException(500, "Failed to delete task");
  }
};
