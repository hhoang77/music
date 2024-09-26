import UserModel from "../models/user.js";
import { hashPassword, passwordMatch } from "../utils/password.js";
import { generateToken } from "../utils/generateToken.js";
import verifyRefreshToken from "../middlewares/verifyRefreshToken.js";

const getAllUser = async () => {
  return await UserModel.find()
    .populate(
      "favoriteSong",
      "-soundQuantity -audio -lyrics -playCount -artistId -genreId"
    )
    .populate("favoriteArtist", "-gender -bio");
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

const updateAvarta = async (id, { image }) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error("User Not Found");
    }
    return await UserModel.findByIdAndUpdate(id, { image }, { new: true });
  } catch (error) {
    console.log(error);
  }
};

const updateFavoriteSong = async (id, { songId }) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error("User Not Found");
    }

    const existed = user.favoriteSong.some((item) => item._id == songId);

    if (existed) {
      user.favoriteSong = user.favoriteSong.filter(
        (item) => item._id != songId
      );
    } else {
      user.favoriteSong.push({ _id: songId });
    }

    return user.save();
  } catch (error) {
    console.log(error);
  }
};

const updateFavoriteArtist = async (id, { artistId }) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error("User Not Found");
    }
    const existed = user.favoriteArtist.some((item) => {
      return item._id == artistId;
    });
    if (existed) {
      user.favoriteArtist = user.favoriteArtist.filter((item) => {
        return item._id != artistId;
      });
    } else {
      user.favoriteArtist.push({ _id: artistId });
    }
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error("User Not Found");
    }
    return await UserModel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

export const userServices = {
  getAllUser,
  register,
  login,
  refreshToken,
  updateAvarta,
  updateFavoriteSong,
  updateFavoriteArtist,
  deleteUser,
};
