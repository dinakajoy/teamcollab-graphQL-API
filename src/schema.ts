import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./gql/mergedResolvers.js";
import typeDefs from "./gql/mergedTypeDefs.js";

export default makeExecutableSchema({ typeDefs, resolvers });
