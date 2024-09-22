import { genreServices } from "../services/genre.js";
import { StatusCodes } from "http-status-codes";

const getAllGenre = async (req, res, next) => {
  try {
    const genre = await genreServices.getAllGenre();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", cotent: genre });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const createGenre = async (req, res, next) => {
  try {
    const { name, image, decription, slug } = req.body;
    const fileData = req.file;
    const genre = await genreServices.createGenre({
      name,
      image: fileData?.path,
      decription,
      slug,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: genre });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateGenre = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { name, image, decription, slug } = req.body;
    const fileData = req.file;
    const genre = await genreServices.updateGenre(id, {
      name,
      image: fileData?.path,
      decription,
      slug,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 200, message: "Xử lý thành công", content: genre });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const deleteGenre = async (req, res, next) => {
  try {
    const id = req.query.id;
    const genre = await genreServices.deleteGenre(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: genre });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const genreControllers = {
  getAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
