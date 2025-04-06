import DataLoader from "dataloader";
import { createClient } from "redis";
import User from "../models/user.js"

export const createLoaders = () =>
  // redisClient: ReturnType<typeof createClient>
  ({
    // userLoader: new DataLoader(async (userIds: string[]) => {
    //   const users = await User.find({ _id: { $in: userIds } });
    //   return userIds.map((id) => users.find((user) => user.id === id) || null);
    // }),
  });
