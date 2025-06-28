import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Token is required" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}
