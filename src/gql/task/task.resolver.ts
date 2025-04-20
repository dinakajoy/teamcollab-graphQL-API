import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from "../../api/task/task.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/context.js";
import { TaskStatusEnum } from "../../models/task.js";

export const taskResolver = {
  Query: {
    tasks: async (
      _parent: unknown,
      args: { projectId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getTasksController(args.projectId);
    },
    task: async (
      _parent: unknown,
      args: { taskId: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new NotFoundUserException();
      checkRole(user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      return loaders.taskLoader.load(args.taskId);
    },
  },

  Mutation: {
    createTask: async (
      _parent: unknown,
      args: {
        title: string;
        description: string;
        projectId: Types.ObjectId;
      },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      const { title, description, projectId } = args;
      return await createTaskController(title, description, projectId);
    },

    updateTask: async (
      _parent: unknown,
      args: {
        taskId: Types.ObjectId;
        title: string;
        description: string;
        status: TaskStatusEnum;
        projectId: Types.ObjectId;
      },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      const { taskId, title, description, status, projectId } = args;
      return await updateTaskController(
        taskId,
        title,
        description,
        status,
        projectId
      );
    },

    deleteTask: async (
      _parent: unknown,
      args: { taskId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteTaskController(args.taskId);
    },
  },
  Task: {
    project: async (
      task: { project?: Types.ObjectId },
      _: any,
      { loaders }: any
    ) => {
      if (!task.project) {
        return null;
      }
      return await loaders.projectLoader.load(task.project);
    },
  },
};
