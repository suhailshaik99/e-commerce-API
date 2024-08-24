import { UsersModel } from "../resources/users/users-model.js";
const basicAuthoriser = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(403).json({
      success: false,
      message: "Authorization headers are missing!!!",
    });
  }

  const decodedValues = Buffer.from(headers.split(" ")[1], "base64").toString("ascii");
  const [username, password] = decodedValues.split(":");
  const userMatch = UsersModel.validateUserByCreds(username, password);

  if (!userMatch) {
    return res.status(403).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  next();
};

export { basicAuthoriser };
