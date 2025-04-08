import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./gql/mergedResolvers";
import typeDefs from "./gql/mergedTypeDefs";

export default makeExecutableSchema({ typeDefs, resolvers });
