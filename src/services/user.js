import UserModel from "../models/user.js";
import { hashPassword, passwordMatch } from "../utils/password.js";
import { generateToken } from "../utils/generateToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const getAllUser = async () => {
  return await UserModel.find();
};

const register = async ({ email, username, password, phone }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw { message: "Email is Exited" };
    }
    const hashpassword = await hashPassword(password);
    return await UserModel.create({
      email,
      username,
      password: hashpassword,
      phone,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("Email Not Found");
    }
    const passwordmatch = await passwordMatch(password, user.password);
    if (!passwordmatch) {
      throw Error("Password Not Match");
    }
    const { accessToken, refreshToken } = generateToken(user?.id);
    console.log(accessToken);
    console.log(refreshToken);

    return { accessToken, refreshToken, user };
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async ({ refreshToken }) => {
  try {
    const payload = await verifyRefreshToken(refreshToken);
    const newTokens = generateToken(payload.userId);
    return newTokens;
  } catch (error) {
    if (error.message === "Invalid Refresh Token") {
      console.log("Refresh token is invalid, please login again");
    } else if (error.message === "Refresh Token has expired") {
      console.log("Refresh token has expired, please login again");
    } else {
      console.log("Some other error occurred: ", error.message);
    }
    return null;
  }
};

export const userServices = {
  getAllUser,
  register,
  login,
  refreshToken,
};
