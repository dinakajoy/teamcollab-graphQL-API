import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import { resolvers } from "./gql/resolvers";

const typeDefs = gql(readFileSync("../schema.graphql", "utf8"));

export { typeDefs, resolvers };
