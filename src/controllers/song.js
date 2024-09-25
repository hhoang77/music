import { songServices } from "../services/song.js";
import { StatusCodes } from "http-status-codes";

const getAllSong = async (req, res, next) => {
  try {
    const song = await songServices.getAllSong();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getSongById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const song = await songServices.getSongById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getSongByGenre = async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const song = await songServices.getSongByGenre(genre);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getSongByArtist = async (req, res, next) => {
  try {
    const id = req.query.id;
    const song = await songServices.getSongByArtist(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 200, message: "Server Error" });
  }
};

const createSong = async (req, res, next) => {
  try {
    const { name, image, audio, lyrics, playCount, artistId, genreId } =
      req.body;

    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const audioFile = req.files["audio"] ? req.files["audio"][0] : null;

    const song = await songServices.createSong({
      name,
      image: imageFile.path,
      audio: audioFile.path,
      lyrics,
      playCount,
      artistId,
      genreId,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const updateSong = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { name, image, audio, lyrics, playCount, artistId, genreId } =
      req.body;
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const audioFile = req.files["audio"] ? req.files["audio"][0] : null;
    const song = await songServices.updateSong(id, {
      name,
      image: imageFile?.path,
      audio: audioFile?.path,
      lyrics,
      playCount,
      artistId,
      genreId,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 201, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const id = req.query.id;
    const song = await songServices.deleteSong(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: song });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const songControllers = {
  getAllSong,
  getSongById,
  getSongByGenre,
  getSongByArtist,
  createSong,
  updateSong,
  deleteSong,
};
