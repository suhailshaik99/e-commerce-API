import express from "express";
import { UsersController } from "./users-controller.js";
import { signInValidator } from "../../middlewares/signin-validator.js";
import { signUpValidator } from "../../middlewares/singup-validator.js";
const router = express.Router();

router.post("/signin", signInValidator, UsersController.signIn);
router.post("/signup", signUpValidator, UsersController.signUp);

export { router };