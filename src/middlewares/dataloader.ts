import { createClient } from "redis";
import createUserLoader from "../gql/user/user.dataloader.js";
import createTeamLoader from "../gql/team/team.dataloader.js";
import createProjectLoader from "../gql/project/project.dataloader.js";
import createTaskLoader from "../gql/task/task.dataloader.js";

export const createLoaders = () =>
  // redisClient: ReturnType<typeof createClient>
  ({
    userLoader: createUserLoader(),
    teamLoader: createTeamLoader(),
    projectLoader: createProjectLoader(),
    taskLoader: createTaskLoader(),
  });
