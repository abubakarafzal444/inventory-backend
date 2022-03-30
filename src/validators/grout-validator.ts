import { body, validationResult } from "express-validator";
import { createQueryBuilder } from "typeorm";
import firebaseUpload from "../middlewares/firebase-upload";

const validateGroutData = [
  body("Name").trim().notEmpty().withMessage("Name field cannot be empty!"),
  body("ItemCode").trim().notEmpty().withMessage("Item code cannot be empty!"),

  body("ItemCode").custom((value) => {
    return createQueryBuilder("grout")
      .where("Grout.ItemCode = :ItemCode", { ItemCode: value })
      .getOne()
      .then((grout) => {
        if (grout) throw new Error("Item code already exists!");
      });
  }),

  body("Quantity")
    .trim()
    .notEmpty()
    .withMessage("Please mention item quantity"),
  body("Price").trim().notEmpty().withMessage("Please write item price"),
  body("Weight")
    .trim()
    .notEmpty()
    .withMessage("Please mention the weight of each piece"),
  body("Company")
    .trim()
    .notEmpty()
    .withMessage("Please mention company name of a grout"),
  body("Color")
    .trim()
    .notEmpty()
    .withMessage("Please mention the color of a grout"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Entered Form data is incorrect",
        errorsArray: errors.array(),
      });
    }
    // if (!req.file) {
    //   return res.status(422).json({
    //     message: "Please select a valid photo of product",
    //     errorsArray: [
    //       {
    //         msg: "Please select a valid photo of product",
    //         param: "image",
    //         location: "body",
    //       },
    //     ],
    //   });
    // }

    next();
  },
  firebaseUpload,
];
export default validateGroutData;
