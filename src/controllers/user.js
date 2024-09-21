import { StatusCodes } from "http-status-codes";
import { userServices } from "../services/user.js";

const getAllUser = async (req, res, next) => {
  try {
    const user = await userServices.getAllUser();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const register = async (req, res, next) => {
  try {
    const { email, username, password, phone } = req.body;
    const user = await userServices.register({
      email,
      username,
      password,
      phone,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    json({ message: "Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await userServices.login({
      email,
      password,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await userServices.refreshToken({ refreshToken });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: newTokens,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const userControllers = {
  getAllUser,
  register,
  login,
  refreshToken,
};
