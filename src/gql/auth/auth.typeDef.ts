export const authTypeDefs = `#graphql
  type LoggedinUser {
    _id: ID!
    name: String!
    email: String!
    role: Role!
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): LoggedinUser
    logout: String
  }
`;
