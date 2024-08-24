import jwt from "jsonwebtoken";
export const jwtAuthorizer = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(403).json({
      success: false,
      message: "UnAuthorized Request sent!!..."
    });
  }
  const token = headers.split(" ")[1];
  jwt.verify(
    token,
    process.env.secretkey,
    (err, decoded) => {
        if(err) {
            return res.status(400).json({message: "Session Expired! Please login again to verify the identify."});
        }
        next();
    });
};