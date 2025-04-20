import { CorsOptions } from "cors";
import logger from "./logger.js";

const allowedOrigins = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:4000",
  // remember to add frontend UI link here
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`Blocked by CORS: ${origin}`);
      callback(new Error("CORS policy: This origin is not allowed"), false);
    }
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
