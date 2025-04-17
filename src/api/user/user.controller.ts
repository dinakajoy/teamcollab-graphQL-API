import { Types } from "mongoose";
import {
  addUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUserById,
} from "./user.service";
import { hashString } from "../../utils/bcryptUtils";
import {
  AlreadyExistingUserException,
  CustomException,
} from "../../utils/errors";
import logger from "../../utils/logger";
import { roleEnum } from "../../interfaces/user.interface";

export const addUserController = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new AlreadyExistingUserException();

    const hashedPassword = await hashString(password);
    return await addUser({ name, email, password: hashedPassword });
  } catch (error) {
    logger.error("addUserController - Error adding user:", error);
    throw new CustomException(500, "Failed to add user");
  }
};

export const getUsersController = async () => {
  try {
    return await getUsers();
  } catch (error) {
    logger.error("getUsersController - Failed to fetch users:", error);
    throw new CustomException(500, "Failed to fetch users");
  }
};

export const getUserController = async (id: Types.ObjectId) => {
  try {
    return await getUserById(id);
  } catch (error) {
    logger.error("getUserController - Error getting user:", error);
    throw new CustomException(500, "Failed to get user");
  }
};

export const updateUserController = async (
  id: Types.ObjectId,
  name: string,
  email: string,
  role: roleEnum
) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) throw new Error("User don't exist");

    const user = await updateUser({ id, name, email, role });

    return user;
  } catch (error) {
    logger.error("updateUserController - Error updating user:", error);
    throw new CustomException(500, "Failed to update user");
  }
};

export const deleteUserController = async (id: Types.ObjectId) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) throw new Error("User don't exist");

    await deleteUserById(id);

    return "User deleted successfully";
  } catch (error) {
    logger.error("deleteUserController - Error deleting user:", error);
    throw new CustomException(500, "Failed to delete user");
  }
};
