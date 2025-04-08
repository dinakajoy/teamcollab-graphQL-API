export const userTypeDefs = `#graphql
  enum Role {
    ADMIN, MANAGER, MEMBER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    token: String
    team: Team!
  }
  
  type Query {
    users: [User]
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String, role: Role): User
    deleteUser(id: ID!): String
  }
`;
