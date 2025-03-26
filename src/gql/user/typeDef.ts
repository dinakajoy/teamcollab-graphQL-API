export const userTypeDefs = `#graphql
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
    token: String
  }
  
  type Query {
    users: [User]
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String, role: Role): User
    deleteUser(id: ID!): String
  }
`;
