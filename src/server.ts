import express from "express";
import http from "http";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { applyMiddleware } from "graphql-middleware";
import schema from "./schema";
import { authMiddleware } from "./middlewares/auth";
import { permissions } from "./middlewares/permissions";
import { createLoaders } from "./middlewares/dataloader";
import { setupMonitoring } from "./middlewares/prometheus";
import { refreshTokenController } from "./api/auth/auth.controller";
import connectDB from "./utils/dbConnect";
import limiter from "./utils/rate-limiter";
import logger from "./utils/logger";
import corsOptions from "./utils/corsOptions";
import { MyContext } from "./interfaces/context";

async function startServer() {
  const app = express();
  setupMonitoring(app);
  const httpServer = http.createServer(app);

  // Connect to MongoDB
  await connectDB();

  const schemaWithPermissions = applyMiddleware(schema, permissions);
  const server = new ApolloServer<MyContext>({
    schema: schemaWithPermissions,
    introspection: process.env.NODE_ENV !== "production",
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
