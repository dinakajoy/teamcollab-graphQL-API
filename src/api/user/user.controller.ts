import { ObjectId } from "mongoose";
import {
  getUsers,
  getUserById,
  addUser,
  getUserByEmail,
  updateUser,
  deleteUserById,
} from "./user.service.js"
import { hashString } from "../../utils/bcryptUtils.js"
import { AlreadyExistingUserException, CustomException } from "../../utils/errors.js"
import logger from "../../utils/logger.js"
import { roleEnum } from "../../interfaces/user.interface.js"

export const getUsersController = async () => {
  try {
    return await getUsers();
  } catch (error) {
    logger.error("getUsersController - Failed to fetch users:", error);
    return [];
  }
};

export const getUserController = async (id: ObjectId) => {
  try {
    return await getUserById(id);
  } catch (error) {
    logger.error("getUserController - Error getting user:", error);
    throw new (CustomException as any)(500, "Failed to get user");
  }
};

export const addUserController = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new (AlreadyExistingUserException as any);

    const hashedPassword = await hashString(password);
    await addUser({ name, email, password: hashedPassword });

    return "User registered successfully";
  } catch (error) {
    logger.error("addUserController - Error adding user:", error);
    throw new (CustomException as any)(500, "Failed to add user");
  }
};

export const updateUserController = async (
  id: ObjectId,
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
    throw new (CustomException as any)(500, "Failed to update user");
  }
};

export const deleteUserController = async (id: ObjectId) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) throw new Error("User don't exist");

    await deleteUserById(id);

    return "User deleted successfully";
  } catch (error) {
    logger.error("deleteUserController - Error deleting user:", error);
    throw new (CustomException as any)(500, "Failed to delete user");
  }
};
