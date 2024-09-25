import express from "express";
import { songControllers } from "../controllers/song.js";
import uploadCloud from "../middlewares/cloudinary.js";

const router = express.Router();

router.route("/").get(songControllers.getAllSong);
router.route("/getById").get(songControllers.getSongById);

router.route("/getByGenre/:genre").get(songControllers.getSongByGenre);
router.route("/getByArtist/").get(songControllers.getSongByArtist);

router.route("/create").post(
  uploadCloud.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songControllers.createSong
);
router.route("/update").put(
  uploadCloud.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songControllers.updateSong
);
router.route("/delete").delete(songControllers.deleteSong);

export default router;
