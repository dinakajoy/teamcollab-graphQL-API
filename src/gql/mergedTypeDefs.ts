import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/user.typeDef.js";
import { authTypeDefs } from "./auth/auth.typeDef.js";
import { teamTypeDefs } from "./team/team.typeDef.js";
import { projectTypeDefs } from "./project/project.typeDef.js";
import { taskTypeDefs } from "./task/task.typeDef.js";

export default mergeTypeDefs([
  userTypeDefs,
  authTypeDefs,
  teamTypeDefs,
  projectTypeDefs,
  taskTypeDefs,
]);
