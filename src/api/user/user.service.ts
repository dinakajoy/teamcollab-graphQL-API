import { Types } from "mongoose";
import User from "../../models/user.js";
import { CustomException } from "../../utils/errors.js";
import logger from "../../utils/logger.js";
import { IUser, roleEnum } from "../../interfaces/user.interface.js";

export const addUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const user = new User({ name, email, password });
    await user.save();
    return user.toObject();
  } catch (error) {
    logger.error("Error adding user:", error);
    throw new (CustomException as any)(500, "Failed to add user");
  }
};

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find()
      .select(["-password", "-refreshToken"])
      .lean<IUser[]>();
    return users;
  } catch (error) {
    logger.error("Failed to fetch users:", error);
    return [];
  }
};

export const getUserById = async (
  id: Types.ObjectId
): Promise<IUser | null> => {
  try {
    return await User.findById(id).select("-password").lean<IUser>();
  } catch (error) {
    logger.error("Error getting user by ID:", error);
    throw new (CustomException as any)(500, "Failed to get user by ID");
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email })
      .select(["-password", "-refreshToken"])
      .lean<IUser>();
  } catch (error) {
    logger.error("Error getting user by email:", error);
    throw new (CustomException as any)(500, "Failed to get user by email");
  }
};

export const updateUser = async ({
  id,
  name,
  email,
  role,
  password,
  refreshToken,
}: {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: roleEnum;
  password?: string;
  refreshToken?: string;
}) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(password && { password }),
        ...(refreshToken && { refreshToken }),
      },
      { new: true }
    );
    if (updatedUser) {
      return await getUserById(id);
    }
    return null;
  } catch (error) {
    logger.error("Error updating user:", error);
    throw new (CustomException as any)(500, "Failed to update user");
  }
};

export const deleteUserById = async (id: Types.ObjectId) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw new (CustomException as any)(500, "Failed to delete user");
  }
};
