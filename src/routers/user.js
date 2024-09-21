import express from "express";
const router = express.Router();
import { userControllers } from "../controllers/user.js";

router.route("/").get(userControllers.getAllUser);
router.route("/register").post(userControllers.register);
router.route("/login").post(userControllers.login);
router.route("/refresh-token").post(userControllers.refreshToken);

export default router;
