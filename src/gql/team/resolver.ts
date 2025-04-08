import { ObjectId } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  createTeamController,
  deleteTeamController,
  getTeamController,
  getTeamsController,
  updateTeamController,
} from "../../api/team/team.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { IUser, roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/gql.js";

export const teamResolver = {
  Query: {
    teams: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getTeamsController();
    },
    team: async (
      _parent: unknown,
      args: { id: ObjectId },
      context: MyContext
    ) => {
      const { user } = context;
      if (!user) throw new Error(NotFoundUserException as any);
      checkRole(user, [roleEnum.ADMIN, roleEnum.MEMBER]);
      return await getTeamController(args.id);
    },
  },

  Mutation: {
    createTeam: async (
      _parent: unknown,
      args: { name: string; description: string }
    ) => {
      const { name, description } = args;
      return await createTeamController(name, description);
    },

    updateTeam: async (
      _parent: unknown,
      args: { id: ObjectId; name: string; description: string; members: IUser[] },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { id, name, description, members } = args;
      return await updateTeamController(id, name, description, members);
    },

    deleteTeam: async (
      _parent: unknown,
      args: { id: ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteTeamController(args.id);
    },
  },
  Team: {
    members: async (team: { members: [ObjectId] }, _: any, { loaders }: any) => {
      return await loaders.userLoader.loadMany(team.members);
    },
  },
};
