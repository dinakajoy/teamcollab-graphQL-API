import bcrypt from "bcryptjs/umd/types";
import User from "../../models/User";
import { signAccessToken } from "../../utils/jwtUtils";

export const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Incorrect password");
    const token = signAccessToken(user);

    return { ...user, id: user._id, token };
  } catch (error) {}
};
