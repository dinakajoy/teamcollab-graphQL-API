import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/typeDef";
import { authTypeDefs } from "./auth/typeDef";
import { teamTypeDefs } from "./team/typeDef";

export default mergeTypeDefs([userTypeDefs, authTypeDefs, teamTypeDefs]);
