import DataLoader from "dataloader";
import { Types } from "mongoose";
import User, { UserDocument } from "../../models/user";

const createUserLoader = (): DataLoader<Types.ObjectId, UserDocument | null> =>
  new DataLoader<Types.ObjectId, UserDocument | null>(async (userIds) => {
    const users = await User.find({ _id: { $in: userIds } });
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    return userIds.map((id) => userMap.get(id.toString()) || null);
  });

export default createUserLoader;
