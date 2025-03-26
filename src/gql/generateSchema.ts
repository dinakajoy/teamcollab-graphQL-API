import { writeFileSync } from "fs";
import { print } from "graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user/typeDef.js";
import { authorTypeDefs } from "./author/typeDef.js";

const mergedTypeDefs = mergeTypeDefs([authorTypeDefs, userTypeDefs]);

const schemaSDL = print(mergedTypeDefs);
writeFileSync("schema.graphql", schemaSDL);
console.log("schema.graphql generated successfully!");

export const typeDefs = mergedTypeDefs;
