import { Types } from "mongoose";
import { checkRole } from "../../middlewares/auth.js";
import {
  addUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../../api/user/user.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { roleEnum } from "../../interfaces/user.interface.js";
import { MyContext } from "../../interfaces/context.js";

export const userResolver = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getUsersController();
    },
    user: async (
      _parent: unknown,
      args: { userId: Types.ObjectId },
      context: MyContext
    ) => {
      const { user } = context;
      if (!user) throw new NotFoundUserException();
      return await getUserController(args.userId);
    },
    currentUser: async (
      _parent: unknown,
      _args: unknown,
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      return await getUserController(context.user._id);
    },
  },

  Mutation: {
    addUser: async (
      _parent: unknown,
      args: { name: string; email: string; password: string }
    ) => {
      const { name, email, password } = args;
      return await addUserController(name, email, password);
    },

    updateUser: async (
      _parent: unknown,
      args: {
        userId: Types.ObjectId;
        name: string;
        email: string;
        role: roleEnum;
      },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      const { userId, name, email, role } = args;
      return await updateUserController(userId, name, email, role);
    },

    deleteUser: async (
      _parent: unknown,
      args: { userId: Types.ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new NotFoundUserException();
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteUserController(args.userId);
    },
  },
  User: {
    teams: async (
      user: { teams?: Types.ObjectId[] },
      _: any,
      { loaders }: any
    ) => {
      if (!user.teams || user.teams.length === 0) {
        return [];
      }
      return await loaders.teamLoader.loadMany(user.teams);
    },
  },
};
