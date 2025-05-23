import dotenv from "dotenv-safe";

dotenv.config();

export default {
  environment: {
    port: Number(process.env.PORT || 4000),
    host: process.env.HOST || "http://localhost",
  },
  dbConfig: {
    url: process.env.DATABASE_URL || "",
    saltWorkFactor: Number(process.env.SALTWORKFACTOR || 10),
  },
  jwt: {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET || "ZfqQuxIS+7/J6VfbWT+7/btX",
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || "SsqQuxISJ6sZf+7/J6VfSWTtX",
  },
  // emailConfig: {
  //   user: process.env.EMAIL_USER || "test@email.com",
  //   password: process.env.EMAIL_PASS || "ISJSsqQux6s",
  // },
};
