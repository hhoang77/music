import express from "express";
import { artistControllers } from "../controllers/artist.js";
import uploadCloud from "../middlewares/cloudinary.js";

const router = express.Router();

router.route("/").get(artistControllers.getAllArtist);
router.route("/getById").get(artistControllers.getArtistById);
router
  .route("/create")
  .post(uploadCloud.single("avarta"), artistControllers.createArtist);
router
  .route("/update")
  .put(uploadCloud.single("avarta"), artistControllers.updateArtist);
router.route("/delete").delete(artistControllers.deleteArtist);

export default router;
