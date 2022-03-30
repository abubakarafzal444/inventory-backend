import { NextFunction, Request, Response } from "express";
import { CustomError } from "../util/custom/classes";
import jwt from "jsonwebtoken";

const Authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.get("Authorization")?.split(" ")[1] as string;

  if (!token)
    return res.status(401).json({
      message: "Authentication failed. Please login to access this resource",
    });

  try {
    const decodedToken: any = jwt.verify(token, "secret-key-to-generate-token");

    if (!decodedToken)
      throw new CustomError(
        401,
        "Authentication failed. Please login to access this resource"
      );
    req.UserName = decodedToken.UserName;
    req.id = decodedToken.id;
    req.Role = decodedToken.Role;

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later!" });
  }
};

const RoleAuthentication = (req: any, res: Response, next: NextFunction) => {
  console.log(req.Role);
  if (req.Role === "Admin") next();
  else
    return res.status(401).json({
      message: "You are not allowed to add new user",
    });
};
export { Authenticate, RoleAuthentication };
