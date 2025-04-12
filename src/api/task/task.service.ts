import { Types } from "mongoose";
import Task from "../../models/task.js";
import { CustomException } from "../../utils/errors.js";
import logger from "../../utils/logger.js";
import { ITask, TaskStatusEnum } from "../../interfaces/task.interface.js";
import { IUser } from "../../interfaces/user.interface.js";

export const createTask = async ({
  title,
  description,
  assignedTo,
  project,
}: {
  title: string;
  description: string;
  assignedTo: Types.ObjectId;
  project: Types.ObjectId;
}) => {
  try {
    const task = new Task({ title, description, assignedTo, project });
    await task.save();
    return task.toObject();
  } catch (error) {
    logger.error("Error adding task:", error);
    throw new (CustomException as any)(500, "Failed to add task");
  }
};

export const getTasks = async (projectId: Types.ObjectId): Promise<ITask[]> => {
  try {
    const tasks = await Task.find({ projectId }).lean<ITask[]>();
    return tasks;
  } catch (error) {
    logger.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const getTaskById = async (
  id: Types.ObjectId
): Promise<ITask | null> => {
  try {
    return await Task.findById(id).lean<ITask>();
  } catch (error) {
    logger.error("Error getting task by ID:", error);
    throw new (CustomException as any)(500, "Failed to get task by ID");
  }
};

export const getTaskByTitle = async (name: string): Promise<ITask | null> => {
  try {
    return await Task.findOne({ name }).select(["-members"]).lean<ITask>();
  } catch (error) {
    logger.error("Error getting task by title:", error);
    throw new (CustomException as any)(500, "Failed to get task by title");
  }
};

export const updateTask = async ({
  id,
  title,
  description,
  assignedTo,
  status,
  project,
}: {
  id: Types.ObjectId;
  title: string;
  description: string;
  assignedTo: Types.ObjectId;
  status: TaskStatusEnum;
  project: Types.ObjectId;
}) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(assignedTo && { assignedTo }),
        ...(status && { status }),
        ...(project && { project }),
      },
      { new: true }
    );
    if (updatedTask) {
      return await getTaskById(id);
    }
    return null;
  } catch (error) {
    logger.error("Error updating task:", error);
    throw new (CustomException as any)(500, "Failed to update task");
  }
};

export const deleteTaskById = async (id: Types.ObjectId) => {
  try {
    return await Task.findByIdAndDelete(id);
  } catch (error) {
    logger.error("Error deleting task:", error);
    throw new (CustomException as any)(500, "Failed to delete task");
  }
};
