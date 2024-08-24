import { body } from "express-validator";
import { UsersModel } from "../resources/users/users-model.js";
export const signUpValidator = [
  body("name")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage(
      "Name shouldn't be empty and must contain atleast 5 characters"
    ),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("email").custom((email) => {
    const status = UsersModel.getUserByEmail(email);
    if (status) {
      throw new Error("Email already in use. Try loggin in either.");
    }
    return true;
  }),
];
