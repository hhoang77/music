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

const updateAvarta = async (req, res, next) => {
  try {
    const id = req.userId;
    const { image } = req.body;
    const imageFile = req.file;
    const user = await userServices.updateAvarta(id, {
      image: imageFile?.path,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const upToPremium = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await userServices.upToPremium(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateFavoriteSong = async (req, res, next) => {
  try {
    const id = req.userId;
    const { songId } = req.body;
    const user = await userServices.updateFavoriteSong(id, { songId });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateFavoriteArtist = async (req, res, next) => {
  try {
    const id = req.userId;
    const { artistId } = req.body;
    const user = await userServices.updateFavoriteArtist(id, { artistId });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { username, subscriptionType, phone, role } = req.body;
    const user = await userServices.updateUserByAdmin(id, {
      username,
      subscriptionType,
      phone,
      role,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 500, message: "Server Error" });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userServices.deleteUser(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
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
  updateAvarta,
  updateFavoriteSong,
  updateFavoriteArtist,
  upToPremium,
  updateUserByAdmin,
  deleteUser,
};
