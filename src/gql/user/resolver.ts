import { ObjectId } from "mongoose";
import { checkRole } from "../../middlewares/auth.js"
import {
  addUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../../api/user/user.controller.js"
import { NotFoundUserException } from "../../utils/errors.js"
import { roleEnum } from "../../interfaces/user.interface.js"
import { MyContext } from "../../interfaces/gql.js"

export const userResolver = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await getUsersController();
    },
    user: async (
      _parent: unknown,
      args: { id: ObjectId },
      context: MyContext
    ) => {
      const { user } = context;
      if (!user) throw new Error(NotFoundUserException as any);
      checkRole(user, [roleEnum.ADMIN, roleEnum.MEMBER]);
      return await getUserController(args.id);
    },
    currentUser: async (
      _parent: unknown,
      _args: unknown,
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
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
      args: { id: ObjectId; name: string; email: string; role: roleEnum },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      const { id, name, email, role } = args;
      return await updateUserController(id, name, email, role);
    },

    deleteUser: async (
      _parent: unknown,
      args: { id: ObjectId },
      context: MyContext
    ) => {
      if (!context.user) throw new Error(NotFoundUserException as any);
      checkRole(context.user, [roleEnum.ADMIN]);
      return await deleteUserController(args.id);
    },
  },
};
