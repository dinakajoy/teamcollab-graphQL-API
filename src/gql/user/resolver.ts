import {
  addUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUser,
} from "../../api/user/user.service";
import { checkRole } from "../../utils/auth";
import { login } from "../../api/auth/auth.service";

export const userResolver = {
  Query: {
    users: async (_, __, { user }) => {
      checkRole(user, ["ADMIN"]);
      return await getUsers();
    },
    user: async (_, { id }, { user }) => {
      checkRole(user, ["ADMIN", "USER"]);
      return await getUserById(id);
    },
    currentUser: async (_, __, { user }) => {
      if (!user) throw new Error("Not Authenticated");
      return await getUserById(user.id);
    },
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      const newUser = await addUser({ username, email, password });

      return newUser;
    },

    login: async (_, { email, password }) => {
      const loggedInUser = await login({ email, password });

      return loggedInUser;
    },

    updateUser: async (_, { id, username, email, role }, { user }) => {
      checkRole(user, ["ADMIN"]);
      return await updateUser({ id, username, email, role });
    },

    deleteUser: async (_, { id }, { user }) => {
      checkRole(user, ["ADMIN"]);
      await deleteUserById(id);
      return "User deleted successfully";
    },
  },
};
