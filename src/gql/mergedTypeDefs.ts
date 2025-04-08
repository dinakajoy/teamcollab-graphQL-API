import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/typeDef";
import { authTypeDefs } from "./auth/typeDef";

export default mergeTypeDefs([userTypeDefs, authTypeDefs]);
