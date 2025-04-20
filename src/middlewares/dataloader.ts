import createUserLoader from "../gql/user/user.dataloader.js";
import createTeamLoader from "../gql/team/team.dataloader.js";
import createProjectLoader from "../gql/project/project.dataloader.js";
import createTaskLoader from "../gql/task/task.dataloader.js";

export const createLoaders = () =>
  ({
    userLoader: createUserLoader(),
    teamLoader: createTeamLoader(),
    projectLoader: createProjectLoader(),
    taskLoader: createTaskLoader(),
  });
