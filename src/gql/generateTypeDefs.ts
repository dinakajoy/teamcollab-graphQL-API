import { writeFileSync } from "fs";
import { print } from "graphql";
import { mergedTypeDefs } from "../gql/mergedTypeDefs";

const schemaSDL = print(mergedTypeDefs);
writeFileSync("schema.graphql", schemaSDL);
console.log("✅ schema.graphql generated successfully!");