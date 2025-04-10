import express from "express";
import http from "http";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { applyMiddleware } from "graphql-middleware";
import schema from "./schema.js";
import { authMiddleware } from "./middlewares/auth.js";
import { permissions } from "./middlewares/permissions.js";
import { refreshTokenController } from "./api/auth/auth.controller.js";
import connectDB from "./utils/dbConnect.js";
import limiter from "./utils/rate-limiter.js";
import logger from "./utils/logger.js";
import corsOptions from "./utils/corsOptions.js";
import { MyContext } from "./interfaces/context.js";
import { createLoaders } from "./middlewares/dataloader.js";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Connect to MongoDB
  await connectDB();

  const schemaWithPermissions = applyMiddleware(schema, permissions);
  const server = new ApolloServer<MyContext>({
    schema: schemaWithPermissions,
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
        return { user, req, res, loaders: createLoaders() };
      },
    })
  );

  const host = config.get("environment.host") as string;
  const port = config.get("environment.port") as number;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(`🚀 Server ready at ${host}:${port}`);
}

startServer();
