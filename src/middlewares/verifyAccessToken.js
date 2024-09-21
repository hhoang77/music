import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        console.log("Token is invalid or has expired");
      }
      console.log("Error: ", error.name);
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Token is invalid or has expired" });
    }
  } else {
    console.error("User is not authorized or has expired");
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "User is not authorized or token is missing" });
  }
};
export default validateToken;
