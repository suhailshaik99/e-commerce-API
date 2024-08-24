import jwt from "jsonwebtoken";
import { UsersModel } from "./users-model.js";
import { validationResult } from "express-validator";
class UsersController {
  static signIn(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = UsersModel.validateUserByCreds(email, password);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Email or Password is Incorrect",
      });
    }

    let payload = {
        email: user.email,
        name: user.name
    };
    let token = jwt.sign(payload, process.env.secretkey, {expiresIn: 30});

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully!!!",
      token: token
    });
  }

  static signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        success: false,
        message: errors.array(),
      });
    }

    const user = UsersModel.createUser(req.body);
    const newUser = { ...user };
    delete newUser.password;
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully!",
      user: newUser,
    });
  }
}

export { UsersController };
