import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          reject({ status: "error", message: "Refresh Token has expired" });
        } else {
          reject({ status: "error", message: "Invalid Refresh Token" });
        }
      } else {
        resolve(payload);
      }
    });
  });
};

export default verifyRefreshToken;
