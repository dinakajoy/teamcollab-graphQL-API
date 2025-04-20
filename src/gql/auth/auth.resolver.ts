import {
  loginController,
  logoutController,
} from "../../api/auth/auth.controller.js";
import { NotFoundUserException } from "../../utils/errors.js";
import { MyContext } from "../../interfaces/context.js";

export const authResolver = {
  Mutation: {
    login: async (
      _parent: unknown,
      args: { email: string; password: string },
      context: MyContext
    ) => {
      const loggedInUser = await loginController(
        context.res,
        args.email,
        args.password
      );

      return loggedInUser;
    },

    logout: async (_parent: unknown, _args: unknown, context: MyContext) => {
      if (!context.user) throw new NotFoundUserException();
      return await logoutController(context.res, context.user._id);
    },
  },
};
