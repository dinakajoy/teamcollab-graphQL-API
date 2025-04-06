import express from "express";
import http from "http";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs, resolvers } from "./schema.js";
import { authMiddleware } from "./middlewares/auth.js";
import { refreshTokenController } from "./api/auth/auth.controller.js";
import connectDB from "./utils/dbConnect.js";
import limiter from "./utils/rate-limiter.js";
import logger from "./utils/logger.js";
import corsOptions from "./utils/corsOptions.js";
import { MyContext } from "./interfaces/gql.js";

async function startServer() {
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

  app.use(limiter);
  app.use(cookieParser());

  app.post("/refresh_token", refreshTokenController);

  app.use(
    "/graphql",
    cors(corsOptions),
    express.json(),
    expressMiddleware<MyContext>(server, {
      context: async ({ req, res }) => {
        const user = await authMiddleware(req);
        return { user, req, res };
      },
    })
  );

  const host = config.get("environment.host") as string;
  const port = config.get("environment.port") as number;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(`🚀 Server ready at ${host}:${port}`);
}

startServer();
