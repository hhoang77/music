import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
