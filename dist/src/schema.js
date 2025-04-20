"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const mergedResolvers_js_1 = __importDefault(require("./gql/mergedResolvers.js"));
const mergedTypeDefs_js_1 = __importDefault(require("./gql/mergedTypeDefs.js"));
exports.default = (0, schema_1.makeExecutableSchema)({ typeDefs: mergedTypeDefs_js_1.default, resolvers: mergedResolvers_js_1.default });
