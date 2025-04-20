"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const connectDB = async () => {
    const dbURL = config_1.default.get("dbConfig.url");
    return mongoose_1.default
        .connect(dbURL)
        .then(() => {
        logger_1.default.info("Database connected successfully");
    })
        .catch((error) => {
        logger_1.default.error(`DB Connect error: ${error.message}`);
        process.exit(1);
    });
};
exports.default = connectDB;
