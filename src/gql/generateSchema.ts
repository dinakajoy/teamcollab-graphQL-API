import { writeFileSync } from "fs";
import { print } from "graphql";
import typeDefs from "./mergedTypeDefs.js";

const schemaSDL = print(typeDefs);
writeFileSync("schema.graphql", schemaSDL);
console.log("✅ schema.graphql generated for documentation!");
