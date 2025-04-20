"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const graphql_middleware_1 = require("graphql-middleware");
const schema_js_1 = __importDefault(require("./schema.js"));
const auth_js_1 = require("./middlewares/auth.js");
const permissions_js_1 = require("./middlewares/permissions.js");
const dataloader_js_1 = require("./middlewares/dataloader.js");
const prometheus_js_1 = require("./middlewares/prometheus.js");
const auth_controller_js_1 = require("./api/auth/auth.controller.js");
const dbConnect_js_1 = __importDefault(require("./utils/dbConnect.js"));
const rate_limiter_js_1 = __importDefault(require("./utils/rate-limiter.js"));
const logger_js_1 = __importDefault(require("./utils/logger.js"));
const corsOptions_js_1 = __importDefault(require("./utils/corsOptions.js"));
dotenv_safe_1.default.config();
async function startServer() {
    const app = (0, express_1.default)();
    (0, prometheus_js_1.setupMonitoring)(app);
    const httpServer = http_1.default.createServer(app);
    // Connect to MongoDB
    await (0, dbConnect_js_1.default)();
    const schemaWithPermissions = (0, graphql_middleware_1.applyMiddleware)(schema_js_1.default, permissions_js_1.permissions);
    const server = new server_1.ApolloServer({
        schema: schemaWithPermissions,
        introspection: process.env.NODE_ENV !== "production",
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use(rate_limiter_js_1.default);
    app.use((0, cookie_parser_1.default)());
    app.post("/refresh_token", auth_controller_js_1.refreshTokenController);
    app.use("/graphql", (0, cors_1.default)(corsOptions_js_1.default), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => {
            const user = await (0, auth_js_1.authMiddleware)(req);
            return { user, req, res, loaders: (0, dataloader_js_1.createLoaders)() };
        },
    }));
    const host = config_1.default.get("environment.host");
    const port = config_1.default.get("environment.port");
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    logger_js_1.default.info(`🚀 Server ready at ${host}:${port}`);
}
startServer();
