export const taskTypeDefs = `#graphql
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type Task {
    id: ID!
    title: String!
    description: String
    assignedTo: User
    status: TaskStatus!
    project: Project!
  }

 type Query {
    tasks(projectId: ID!): [Task!]!
    task(id: ID!): Task!
  }

  type Mutation {
    createTask(projectId: ID!, title: String!, description: String, assignedTo: ID): Task!
    updateTask(id: ID!, projectId: ID!, title: String!, description: String, assignedTo: ID, status: TaskStatus!): Task!
    deleteTask(id: ID!): String
  }
`;
