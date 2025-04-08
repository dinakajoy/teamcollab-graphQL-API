import { rule, shield, allow } from "graphql-shield";
import { roleEnum } from "../interfaces/user.interface.js";

const isAuthenticated = rule()(async (_, __, { user }) => !!user);
const isAdmin = rule()(
  async (_, __, { user }) => user?.role === roleEnum.ADMIN
);

export const permissions = shield(
  {
    Query: {
      users: isAdmin,
      user: isAuthenticated,
      currentUser: isAuthenticated,
    },
    Mutation: {
      updateUser: isAdmin,
      deleteUser: isAuthenticated,
      addUser: allow,
      login: allow,
      logout: allow,
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
  }
);
