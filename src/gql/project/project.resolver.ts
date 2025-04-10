import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../../api/project/project.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/context.js";

export const projectResolver = {
  Query: {
    projects: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getProjectsController();
    },
    project: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new Error(NotFoundUserException as any);
      checkRole(user, [roleEnum.ADMIN, roleEnum.MEMBER]);
      return loaders.projectLoader.load(args.id);
    },
  },

  Mutation: {
    createProject: async (
      _parent: unknown,
      args: { name: string; description: string; teamId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { name, description, teamId } = args;
      return await createProjectController(name, description, teamId);
    },

    updateProject: async (
      _parent: unknown,
      args: {
        id: Types.ObjectId;
        name: string;
        description: string;
        teamId: Types.ObjectId;
        membersId: Types.ObjectId[];
      },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { id, name, description, teamId, membersId } = args;
      return await updateProjectController(
        id,
        name,
        description,
        teamId,
        membersId
      );
    },

    deleteProject: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteProjectController(args.id);
    },
  },
  Project: {
    members: async (
      project: { members: [Types.ObjectId] },
      _: any,
      { loaders }: any
    ) => {
      return await loaders.userLoader.loadMany(project.members);
    },
    team: async (
      project: { team: [Types.ObjectId] },
      _: any,
      { loaders }: any
    ) => {
      return await loaders.teamLoader.loadMany(project.team);
    },
    tasks: async (
      project: { tasks: [Types.ObjectId] },
      _: any,
      { loaders }: any
    ) => {
      return await loaders.taskLoader.loadMany(project.tasks);
    },
  },
};
