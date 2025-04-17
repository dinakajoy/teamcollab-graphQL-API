import createUserLoader from "../gql/user/user.dataloader";
import createTeamLoader from "../gql/team/team.dataloader";
import createProjectLoader from "../gql/project/project.dataloader";
import createTaskLoader from "../gql/task/task.dataloader";

export const createLoaders = () =>
  ({
    userLoader: createUserLoader(),
    teamLoader: createTeamLoader(),
    projectLoader: createProjectLoader(),
    taskLoader: createTaskLoader(),
  });
