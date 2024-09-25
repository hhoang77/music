import express from "express";
import { genreControllers } from "../controllers/genre.js";
import uploadCloud from "../middlewares/cloudinary.js";

const router = express.Router();

router.route("/").get(genreControllers.getAllGenre);
router.route("/getById").get(genreControllers.getGenreById);
router
  .route("/create")
  .post(uploadCloud.single("image"), genreControllers.createGenre);
router
  .route("/update")
  .put(uploadCloud.single("image"), genreControllers.updateGenre);
router.route("/delete").delete(genreControllers.deleteGenre);

export default router;
