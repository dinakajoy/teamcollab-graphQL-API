import path from "path";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import resolvers from "./gql/generateResolvers.js";

const schemaPath = path.join(__dirname, "../../schema.graphql");
const typeDefs = gql(readFileSync(schemaPath, "utf8"));

export { typeDefs, resolvers };
