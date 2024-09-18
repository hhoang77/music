import { StatusCodes } from "http-status-codes";
import { userServices } from "../services/user.js";

const getAllUser = async (req, res, next) => {
  try {
    const user = userServices.getAllUser();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi Server" });
  }
};

export const userControllers = {
  getAllUser,
};
