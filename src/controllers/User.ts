import { Request, Response, NextFunction } from "express";
import { User } from "../Entities/User";
import { Role } from "../Entities/Role";
import { Connection, createQueryBuilder, getRepository } from "typeorm";
import { connection } from "../../app";
import jwt from "jsonwebtoken";
import { LoginUser } from "../../Type Definitions/Types";
import { CustomError } from "../util/custom/classes";
import { getConnection } from "typeorm";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";

const bcrypt = require("bcryptjs");

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { UserName, Password, Role: roleReceived } = req.body;

  try {
    const role = Role.create({
      Role: roleReceived,
    });
    const roleSaved = await role.save();

    const hashed = await bcrypt.hash(Password, 12);

    const user = User.create({
      UserName,
      Password: hashed,
      role: roleSaved,
    });

    const savedUser = await user.save();

    return res.status(201).json({
      // data: {
      //   user: savedUser,
      // },
      message: "New user has been added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  let loadedUser: LoginUser;

  getRepository("user")
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "Role")
    .where("user.UserName = :UserName", { UserName: req.body.UserName })
    .getOne()

    .then((user: any) => {
      if (!user) throw new CustomError(401, "Entered username is incorrect!");
      const { role, ...userData } = user;
      loadedUser = { ...userData, Role: role.Role };

      return bcrypt.compare(req.body.Password, user.Password);
    })
    .then((isEqual) => {
      if (!isEqual)
        throw new CustomError(401, "Entered password is incorrect!");

      const token = jwt.sign(
        {
          UserName: loadedUser.UserName,
          id: loadedUser.id,
          Role: loadedUser.Role,
        },
        "secret-key-to-generate-token",
        { expiresIn: "10d" }
      );

      res.status(200).json({
        token: token,
        message: "Logged in successfully!",
        user: loadedUser,
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
