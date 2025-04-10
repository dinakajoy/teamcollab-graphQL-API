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
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getTeamsController();
    },
    team: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      { user, loaders }: MyContext
    ) => {
      if (!user) throw new Error(NotFoundUserException as any);
      checkRole(user, [roleEnum.ADMIN, roleEnum.MEMBER]);
      return loaders.teamLoader.load(args.id);
    },
  },

  Mutation: {
    createTeam: async (
      _parent: unknown,
      args: { name: string; description: string },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { name, description } = args;
      return await createTeamController(name, description);
    },

    updateTeam: async (
      _parent: unknown,
      args: {
        id: Types.ObjectId;
        name: string;
        description: string;
        membersId: Types.ObjectId[];
      },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { id, name, description, membersId } = args;
      return await updateTeamController(id, name, description, membersId);
    },

    deleteTeam: async (
      _parent: unknown,
      args: { id: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteTeamController(args.id);
    },
  },
  Team: {
    members: async (
      team: { members: [Types.ObjectId] },
      _: any,
      { loaders }: any
    ) => {
      return await loaders.userLoader.loadMany(team.members);
    },
  },
};
