import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs, resolvers } from "./schema";
import { MyContext } from "./interfaces/gql";
import connectDB from "./utils/dbConnect";

const app = express();
const httpServer = http.createServer(app);

// Connect to MongoDB
await connectDB();

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use("/graphql", [
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
  // expressMiddleware(server, {
  //   context: async ({ req }: { req: Request }) => {
  //     const user = authMiddleware(req);
  //     return { user };
  //     // ({ user: authMiddleware(req) }),
  //   },
  // }),
]);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);
