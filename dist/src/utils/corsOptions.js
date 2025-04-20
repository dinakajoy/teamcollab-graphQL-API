"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = __importDefault(require("./logger.js"));
const allowedOrigins = [
    "http://127.0.0.1:5000",
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:4000",
    // remember to add frontend UI link here
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            logger_js_1.default.warn(`Blocked by CORS: ${origin}`);
            callback(new Error("CORS policy: This origin is not allowed"), false);
        }
    },
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
exports.default = corsOptions;
