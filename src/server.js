import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import { routers } from "./routers/index.js";
import { connectDB } from "./configs/connectDb.js";
import { corsOptions } from "./configs/cors.js";

const port = process.env.PORT;
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/user", routers.user);
app.use("/genre", routers.genre);
app.use("/artist", routers.artist);
app.use("/song", routers.song);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(port, (req, res) => {
  console.log(`listen running on port ${port}`);
});
