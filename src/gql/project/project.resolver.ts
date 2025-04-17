import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../../api/project/project.controller";
import { NotFoundUserException } from "../../utils/errors";
import { roleEnum } from "../../interfaces/user.interface";
import { MyContext } from "../../interfaces/context";

export const projectResolver = {
  Query: {
    projects: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getProjectsController();
    },
    project: async (
      _parent: unknown,
      args: { projectId: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new NotFoundUserException();
      checkRole(user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      return loaders.projectLoader.load(args.projectId);
    },
  },

  Mutation: {
    createProject: async (
      _parent: unknown,
      args: { name: string; description: string; teamId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      const { name, description, teamId } = args;
      return await createProjectController(name, description, teamId);
    },

    updateProject: async (
      _parent: unknown,
      args: {
        projectId: Types.ObjectId;
        name: string;
        description: string;
        teamId: Types.ObjectId;
        membersId: Types.ObjectId[];
      },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN, roleEnum.MANAGER]);
      const { projectId, name, description, teamId, membersId } = args;
      return await updateProjectController(
        projectId,
        name,
        description,
        teamId,
        membersId
      );
    },

    deleteProject: async (
      _parent: unknown,
      args: { projectId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteProjectController(args.projectId);
    },
  },
  Project: {
    team: async (
      project: { team?: Types.ObjectId[] },
      _: any,
      { loaders }: any
    ) => {
      if (!project.team || project.team.length === 0) {
        return [];
      }
      return await loaders.teamLoader.loadMany(project.team);
    },
    tasks: async (
      project: { tasks?: Types.ObjectId[] },
      _: any,
      { loaders }: any
    ) => {
      if (!project.tasks || project.tasks.length === 0) {
        return [];
      }
      return await loaders.taskLoader.loadMany(project.tasks);
    },
  },
};
