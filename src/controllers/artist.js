import { StatusCodes } from "http-status-codes";
import { artistServices } from "../services/artist.js";

const getAllArtist = async (req, res, next) => {
  try {
    const artist = await artistServices.getAllArtist();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: artist });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const createArtist = async (req, res, next) => {
  try {
    const { name, avarta, gender, bio } = req.body;
    const fileData = req.file;
    const artist = await artistServices.createArtist({
      name,
      avarta: fileData?.path,
      gender,
      bio,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: artist });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateArtist = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { name, avarta, gender, bio } = req.body;
    const fileData = req.file;
    const artist = await artistServices.updateArtist(id, {
      name,
      avarta: fileData?.path,
      gender,
      bio,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 200, message: "Xử lý thành công", content: artist });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    const id = req.query.id;
    const artist = await artistServices.deleteArtist(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: artist });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const artistControllers = {
  getAllArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
