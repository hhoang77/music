import express from "express";
import { userControllers } from "../controllers/user.js";
import uploadCloud from "../middlewares/cloudinary.js";
import validateToken from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.route("/").get(userControllers.getAllUser);
router.route("/register").post(userControllers.register);
router.route("/login").post(userControllers.login);
router.route("/refresh-token").post(userControllers.refreshToken);
router
  .route("/update-avarta")
  .put(
    uploadCloud.single("image"),
    validateToken,
    userControllers.updateAvarta
  );
router
  .route("/favoriteSong")
  .put(validateToken, userControllers.updateFavoriteSong);
router
  .route("/favoriteArtist")
  .put(validateToken, userControllers.updateFavoriteArtist);
router.route("/delete").delete(userControllers.deleteUser);
export default router;
