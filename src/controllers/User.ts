import { Request, Response, NextFunction } from "express";
import { User } from "../Entities/User";
import { createQueryBuilder } from "typeorm";
import jwt from "jsonwebtoken";
import { LoginUser } from "../../Type Definitions/Types";
import { CustomError } from "../util/custom/classes";

const bcrypt = require("bcryptjs");

const addUser = (req: Request, res: Response, next: NextFunction) => {
  const { UserName, Password, Role } = req.body;

  bcrypt
    .hash(Password, 12)
    .then((hashed: string) => {
      const user = User.create({
        UserName,
        Password: hashed,
        Role,
      });
      return user.save();
    })
    .then(() =>
      res.status(201).json({
        // data: {
        //   UserName: response.UserName,
        //   Role: response.Role,
        // },
        message: "New user has been added successfully",
      })
    )
    .catch(() =>
      res.status(500).json({
        message: "Something went wrong. Please try again later!",
      })
    );
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  let loadedUser: LoginUser;
  createQueryBuilder("user")
    .where("User.UserName = :UserName", { UserName: req.body.UserName })
    .getOne()
    .then((user: any) => {
      if (!user) throw new CustomError(401, "Entered username is incorrect!");
      loadedUser = user;

      return bcrypt.compare(req.body.Password, user.Password);
    })
    .then((isEqual) => {
      if (!isEqual)
        throw new CustomError(401, "Entered password is incorrect!");

      const token = jwt.sign(
        {
          UserName: loadedUser.UserName,
          id: loadedUser.id,
        },
        "secret-key-to-generate-token",
        { expiresIn: "10d" }
      );

      res.status(200).json({
        token: token,
        message: "Logged in successfully!",
        UserName: loadedUser.UserName,
        Role: loadedUser.Role,
      });
    })

    .catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
      } else
        res
          .status(500)
          .json({ message: "Something went wrong. Please try again later!" });
    });
};
export { addUser, loginUser };
