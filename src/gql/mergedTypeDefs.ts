import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/user.typeDef";
import { authTypeDefs } from "./auth/auth.typeDef";
import { teamTypeDefs } from "./team/team.typeDef";
import { projectTypeDefs } from "./project/project.typeDef";
import { taskTypeDefs } from "./task/task.typeDef";

export default mergeTypeDefs([
  userTypeDefs,
  authTypeDefs,
  teamTypeDefs,
  projectTypeDefs,
  taskTypeDefs,
]);
