export const authorTypeDefs = `#graphql
type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }
  
  type Query {
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addAuthor(author: AddAuthorInput!): Author
    updateAuthor(id: ID!, data: UpdateAuthorInput!): Author
    deleteAuthor(id: ID!): [Author]
  }
  
  input AddAuthorInput {
    name: String!
    verified: Boolean!
  }

  input UpdateAuthorInput {
    name: String
    verified: Boolean
  }
`;
