"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTypeDefs = void 0;
exports.authTypeDefs = `#graphql
  type LoggedinUser {
    _id: ID!
    name: String!
    email: String!
    role: Role!
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): LoggedinUser
    logout: String
  }
`;
