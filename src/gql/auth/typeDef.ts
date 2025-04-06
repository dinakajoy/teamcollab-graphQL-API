export const authTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): User
    logout: String
  }
`;
