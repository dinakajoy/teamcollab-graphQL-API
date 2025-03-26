import db from "../../db/index.js";

export const authorResolver = {
  Query: {
    authors() {
      return db.authors;
    },
    author(_, { id }) {
      return db.authors.find((author) => author.id === id);
    },
  },
  Mutation: {
    addAuthor(_, args) {
      let author = {
        id: Math.floor(Math.random() + 10000).toString(),
        ...args.author,
      };
      db.authors.push(author);

      return author;
    },
    updateAuthor(_, args) {
      let authorToUpdate;
      let updatedAuthors = db.authors.map((author) => {
        if (author.id === args.id) {
          authorToUpdate = {
            ...author,
            ...args.data,
          };
        }
        return authorToUpdate;
      });
      db.authors = updatedAuthors;

      return authorToUpdate;
    },
    deleteAuthor(_, { id }) {
      db.authors = db.authors.filter((author) => author.id !== id);

      return db.authors;
    },
  },
  Author: {
    reviews({ id }) {
      return db.reviews.filter((review) => review.author_id === id);
    },
  },
};
