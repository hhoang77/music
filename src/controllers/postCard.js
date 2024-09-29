import { StatusCodes } from "http-status-codes";
import { postCardServices } from "../services/postCard.js";

const getAllPostCard = async (req, res, next) => {
  try {
    const postCard = await postCardServices.getAllPostCard();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: postCard });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const createPostCard = async (req, res, next) => {
  try {
    const { title, artistId, genreId, content, image, audio } = req.body;
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const audioFile = req.files["audio"] ? req.files["audio"][0] : null;
    const postCard = await postCardServices.createPostCard({
      title,
      artistId,
      genreId,
      content,
      image: imageFile?.path,
      audio: audioFile?.path,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: postCard });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updatePostCard = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { title, artistId, genreId, content, image, audio } = req.body;
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const audioFile = req.files["audio"] ? req.files["audio"][0] : null;
    const postCard = await postCardServices.updatePostCard(id, {
      title,
      artistId,
      genreId,
      content,
      image: imageFile?.path,
      audio: audioFile?.path,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: postCard });
  } catch (error) {
    console.log(err);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const deletePostCard = async (req, res, next) => {
  try {
    const id = req.query.id;
    const postCard = await postCardServices.deletePostCard(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: postCard });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const postCardControllers = {
  getAllPostCard,
  createPostCard,
  updatePostCard,
  deletePostCard,
};
