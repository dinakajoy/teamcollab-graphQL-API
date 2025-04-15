export const projectTypeDefs = `#graphql
  type Project {
    _id: ID!
    name: String!
    description: String
    team: [Team]
    tasks: [Task]
  }

  type Query {
    projects: [Project!]!
    project(projectId: ID!): Project
  }

  type Mutation {
    createProject(name: String!, description: String, teamId: [ID!]): Project!
    updateProject(projectId: ID!, name: String!, description: String, teamId: [ID!]): Project!
    deleteProject(projectId: ID!): String
  }
`;
