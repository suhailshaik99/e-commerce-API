import jwt from "jsonwebtoken";
import { UsersModel } from "./users-model.js";
import { validationResult } from "express-validator";
import { AppError } from "../../utils/appError.js";
class UsersController {
  static async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await UsersModel.validateUserByCreds(email, password);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Email or Password is Incorrect",
      });
    }

    let payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    let token = jwt.sign(payload, process.env.secretkey, { expiresIn: "10m" });

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully!!!",
      token: token,
    });
  }

  static async signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        success: false,
        message: errors.array(),
      });
    }

    const user = await UsersModel.createUser(req.body);
    if (!user) return next(new AppError("Database operation failed..."));
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully!",
      user,
    });
  }

  static async getAllUsers(req, res, next) {
    const users = await UsersModel.getAllUsers();
    if (!users) {
      return next(new AppError("Failed to query the database.."));
    }
    res.status(200).json({
      status: "success",
      message: "Users Data fetched..",
      results: users.length,
      users,
    });
  }
}

export { UsersController };
