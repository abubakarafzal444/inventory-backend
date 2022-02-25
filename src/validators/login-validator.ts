import { body, validationResult } from "express-validator";

const validateLogin = [
  body("UserName").trim().notEmpty().withMessage("Username cannot be empty!"),
  body("Password").trim().notEmpty().withMessage("Password cannot be empty!"),

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
export default validateLogin;
