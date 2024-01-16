import express from "express";
import authController from "./authController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").isLength({ min: 3, max: 18 }),
    check("email", "Text must be email type").isEmail(),
    check("password", "Password must be longer than 8 symbols").isLength({
      min: 8,
    }),
  ],
  authController.registration,
);
router.post("/login", authController.login);

export default router;
