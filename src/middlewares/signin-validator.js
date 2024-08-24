import { body } from "express-validator";
export const signInValidator = [
    body('email').isEmail().notEmpty().withMessage("Please enter a valid email address."),
    body('password').notEmpty().withMessage("Please enter a valid password..")
]