import DataLoader from "dataloader";
import { Types } from "mongoose";
import User, { UserDocument } from "../../models/user.js";

const createUserLoader = (): DataLoader<Types.ObjectId, UserDocument | null> =>
  new DataLoader<Types.ObjectId, UserDocument | null>(async (userIds: readonly Types.ObjectId[]) => {
    const users = await User.find({ _id: { $in: userIds } });
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    return userIds.map((id) => userMap.get(id.toString()) || null);
  });

export default createUserLoader;
