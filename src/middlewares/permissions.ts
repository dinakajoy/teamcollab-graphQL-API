import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()(async (_, __, { user }) => !!user);
const isAdmin = rule()(async (_, __, { user }) => user?.role === "admin");

export const permissions = shield({
  Query: {
    users: isAdmin,
  },
  Mutation: {
    createTeam: isAuthenticated,
  },
});
