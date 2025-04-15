export const taskTypeDefs = `#graphql
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    status: TaskStatus!
    project: Project
  }

 type Query {
    tasks(projectId: ID!): [Task!]!
    task(taskId: ID!): Task!
  }

  type Mutation {
    createTask(projectId: ID!, title: String!, description: String, assignedTo: ID): Task!
    updateTask(taskId: ID!, projectId: ID!, title: String!, description: String, status: TaskStatus!): Task!
    deleteTask(taskId: ID!): String
  }
`;
