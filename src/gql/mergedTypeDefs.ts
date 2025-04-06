import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/typeDef";
import { authTypeDefs } from "./auth/typeDef";

export const mergedTypeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);
