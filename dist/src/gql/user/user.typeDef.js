"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
exports.userTypeDefs = `#graphql
  enum Role {
    ADMIN
    MANAGER
    MEMBER
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: Role!
    teams: [Team]
  }
  
  type Query {
    users: [User]
    user(userId: ID!): User
    currentUser: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    updateUser(userId: ID!, name: String, email: String, password: String, role: Role): User
    deleteUser(userId: ID!): String
  }
`;
