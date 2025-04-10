import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from "../../api/task/task.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { IUser, roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/context.js";
import { TaskStatusEnum } from "../../models/task.js";

export const taskResolver = {
  Query: {
    tasks: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getTasksController();
    },
    task: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new Error(NotFoundUserException as any);
      checkRole(user, [roleEnum.ADMIN, roleEnum.MEMBER]);
      return loaders.taskLoader.load(args.id);
    },
  },

  Mutation: {
    createTask: async (
      _parent: unknown,
      args: {
        title: string;
        description: string;
        assignedTo: Types.ObjectId;
        projectId: Types.ObjectId;
      },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { title, description, assignedTo, projectId } = args;
      return await createTaskController(
        title,
        description,
        assignedTo,
        projectId
      );
    },

    updateTask: async (
      _parent: unknown,
      args: {
        id: Types.ObjectId;
        title: string;
        description: string;
        assignedTo: Types.ObjectId;
        status: TaskStatusEnum;
        projectId: Types.ObjectId;
      },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { id, title, description, assignedTo, status, projectId } = args;
      return await updateTaskController(
        id,
        title,
        description,
        assignedTo,
        status,
        projectId
      );
    },

    deleteTask: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteTaskController(args.id);
    },
  },
  Task: {
    assignedTo: async (
      assignedTo: Types.ObjectId,
      _: any,
      { loaders }: any
    ) => {
      return await loaders.userLoader.loadMany([assignedTo]);
    },
    project: async (
      task: { project: [Types.ObjectId] },
      _: any,
      { loaders }: any
    ) => {
      return await loaders.projectLoader.loadMany(task.project);
    },
  },
};
