import express from "express";
const router = express.Router();
import { userControllers } from "../controllers/user.js";

router.route("/").get(userControllers.getAllUser);

export default router;
