export const teamTypeDefs = `#graphql
  type Team {
    id: ID!
    name: String!
    description: String
    members: [User!]!
  }
  
  type Query {
    teams: [Team!]!
    team(id: ID!): Team
  }

  type Mutation {
    createTeam(name: String!, description: String!): Team!
    updateTeam(id: ID!, name: String, description: String, membersId: [ID!]!): Team!
    deleteTeam(id: ID!): String
  }
`;
