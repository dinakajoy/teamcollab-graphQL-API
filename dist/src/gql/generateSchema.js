"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const graphql_1 = require("graphql");
const mergedTypeDefs_js_1 = __importDefault(require("./mergedTypeDefs.js"));
const schemaSDL = (0, graphql_1.print)(mergedTypeDefs_js_1.default);
(0, fs_1.writeFileSync)("schema.graphql", schemaSDL);
console.log("✅ schema.graphql generated for documentation!");
