import UserModel from "../models/user.js";

const getAllUser = async () => {
  return await UserModel.find({}, { password: 0 });
};

export const userServices = {
  getAllUser,
};
