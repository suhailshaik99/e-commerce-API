import { body } from "express-validator";
import { UsersModel } from "../resources/users/users-model.js";
export const signInValidator = [
    body('email').isEmail().notEmpty().withMessage("Please enter a valid email address."),
    body('email').custom(async (email) => {
        const user = await UsersModel.getUserByEmail(email);
        if(!user){
            throw new Error("Incorrect Email or Password")
        }
        return true;
    }),
    body('password').notEmpty().withMessage("Please enter a valid password..")
]