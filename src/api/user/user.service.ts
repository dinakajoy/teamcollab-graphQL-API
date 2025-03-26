import bcrypt from "bcryptjs/umd/types";
import User from "../../models/User";
import { signAccessToken } from "../../utils/jwtUtils";

export const getUsers = async () => {
  try {
    return await User.find().lean();
  } catch (error) {}
};

export const getUserById = async (id: string) => {
  try {
    return await User.findById(id).lean();
  } catch (error) {}
};

export const addUser = async ({ username, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = signAccessToken(user);

    return { ...user, id: user._id, token };
  } catch (error) {}
};

export const updateUser = async ({ id, username, email, role }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true }
    );
    if (updatedUser) {
      return await getUserById(id);
    }
  } catch (error) {}
};

export const deleteUserById = async (id: string) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {}
};
