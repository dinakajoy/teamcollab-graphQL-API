import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/user.resolver.js";
import { authResolver } from "./auth/auth.resolver.js";
import { teamResolver } from "./team/team.resolver.js";
import { projectResolver } from "./project/project.resolver.js";
import { taskResolver } from "./task/task.resolver.js";

export default mergeResolvers([
  userResolver,
  authResolver,
  teamResolver,
  projectResolver,
  taskResolver,
]);
