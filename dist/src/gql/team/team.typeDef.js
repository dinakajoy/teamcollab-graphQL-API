"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamTypeDefs = void 0;
exports.teamTypeDefs = `#graphql
  type Team {
    _id: ID!
    name: String!
    description: String
    members: [User]
    projects: [Project]
  }
  
  type Query {
    teams: [Team!]!
    team(teamId: ID!): Team
  }

  type Mutation {
    createTeam(name: String!, description: String!): Team!
    updateTeam(teamId: ID!, name: String, description: String, membersId: [ID!]!): Team!
    deleteTeam(teamId: ID!): String
  }
`;
