import jwt from "jsonwebtoken";
import { secret } from "../../config.js";

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export default generateAccessToken;
