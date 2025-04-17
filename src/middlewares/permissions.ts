import { rule, shield, allow, and } from "graphql-shield";
import { roleEnum } from "../interfaces/user.interface";

const isAuthenticated = rule()(async (_, __, { user }) => !!user);
const isAdmin = rule()(
  async (_, __, { user }) => user?.role === roleEnum.ADMIN
);
const isManager = rule()(
  async (_, __, { user }) => user?.role === roleEnum.MANAGER
);
export const permissions = shield(
  {
    Query: {
      users: isAdmin,
      user: isAuthenticated,
      currentUser: isAuthenticated,
      teams: isAdmin,
      team: isAdmin,
      tasks: isAdmin,
      task: and(isAdmin, isManager),
      projects: isAdmin,
      project: and(isAdmin, isManager),
    },
    Mutation: {
      addUser: allow,
      updateUser: allow,
      deleteUser: isAdmin,
      login: allow,
      logout: allow,
      createTeam: isAdmin,
      updateTeam: isAdmin,
      deleteTeam: isAdmin,
      createTask: and(isAdmin, isManager),
      updateTask: and(isAdmin, isManager),
      deleteTask: isAdmin,
      createProject: and(isAdmin, isManager),
      updateProject: and(isAdmin, isManager),
      deleteProject: isAdmin,
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
  }
);
