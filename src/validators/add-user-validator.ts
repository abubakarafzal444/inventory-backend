import { body, validationResult } from "express-validator";
import { createQueryBuilder } from "typeorm";
const validateAddUser = [
  body("UserName").trim().notEmpty().withMessage("Username cannot be empty!"),
  body("Password").trim().notEmpty().withMessage("Password cannot be empty!"),
  body("ConfirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password cannot be empty!"),
  body("ConfirmPassword").custom((value: string, { req }) => {
    if (value !== req.body.Password) throw new Error("Passwords do not match");
    return true;
  }),
  body("Role").custom((value: string, { req }) => {
    if (value !== "Admin") throw new Error("Invalid role is selected");
    return true;
  }),

  body("UserName").custom((value) => {
    return createQueryBuilder("user")
      .where("User.UserName = :UserName", { UserName: value })
      .getOne()
      .then((user) => {
        if (user) throw new Error("Username already exists!");
      });
  }),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Entered Form data is incorrect",
        errorsArray: errors.array(),
      });
    } else next();
  },
];
export default validateAddUser;
