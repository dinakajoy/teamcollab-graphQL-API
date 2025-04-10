import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/user.resolver";
import { authResolver } from "./auth/auth.resolver";
import { teamResolver } from "./team/team.resolver";
import { projectResolver } from "./project/project.resolver";
import { taskResolver } from "./task/task.resolver";

export default mergeResolvers([
  userResolver,
  authResolver,
  teamResolver,
  projectResolver,
  taskResolver,
]);
