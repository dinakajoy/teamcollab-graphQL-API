import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  createTeamController,
  deleteTeamController,
  getTeamsController,
  updateTeamController,
} from "../../api/team/team.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/context.js";

export const teamResolver = {
  Query: {
    teams: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getTeamsController();
    },
    team: async (
      _parent: unknown,
      args: { teamId: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new NotFoundUserException();
      checkRole(user, [roleEnum.ADMIN]);
      return loaders.teamLoader.load(args.teamId);
    },
  },

  Mutation: {
    createTeam: async (
      _parent: unknown,
      args: { name: string; description: string },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      const { name, description } = args;
      return await createTeamController(name, description);
    },

    updateTeam: async (
      _parent: unknown,
      args: {
        teamId: Types.ObjectId;
        name: string;
        description: string;
        membersId: Types.ObjectId[];
      },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      const { teamId, name, description, membersId } = args;
      return await updateTeamController(teamId, name, description, membersId);
    },

    deleteTeam: async (
      _parent: unknown,
      args: { teamId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteTeamController(args.teamId);
    },
  },
  Team: {
    members: async (
      team: { members?: Types.ObjectId[] },
      _: any,
      { loaders }: any
    ) => {
      if (!team.members || team.members.length === 0) {
        return [];
      }
      return await loaders.userLoader.loadMany(team.members);
    },
    projects: async (
      team: { projects?: Types.ObjectId[] },
      _: any,
      { loaders }: any
    ) => {
      if (!team.projects || team.projects.length === 0) {
        return [];
      }
      return await loaders.projectLoader.loadMany(team.projects);
    },
  },
};
