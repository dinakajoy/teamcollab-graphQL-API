export const projectTypeDefs = `#graphql
  type Project {
    id: ID!
    name: String!
    description: String
    team: Team!
    members: [User!]!
    tasks: [Task!]!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    createProject(name: String!, description: String, teamId: ID!): Project!
    updateProject(id: ID!, name: String!, description: String, teamId: ID!, membersId: [ID!]!): Project!
    deleteProject(id: ID!): String
  }
`;
