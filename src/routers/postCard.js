import express from "express";
import uploadCloud from "../middlewares/cloudinary.js";
import { postCardControllers } from "../controllers/postCard.js";

const router = express.Router();

router.route("/").get(postCardControllers.getAllPostCard);
router.route("/create").post(
  uploadCloud.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  postCardControllers.createPostCard
);
router.route("/update").put(
  uploadCloud.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  postCardControllers.updatePostCard
);
router.route("/delete").delete(postCardControllers.deletePostCard);

export default router;
