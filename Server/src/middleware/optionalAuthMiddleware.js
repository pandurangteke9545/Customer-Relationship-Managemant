import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function optionalAuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(); 
  }

  console.log("We are in optional lead auth middleware");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    req.user = decoded;
    next();
  });
}
