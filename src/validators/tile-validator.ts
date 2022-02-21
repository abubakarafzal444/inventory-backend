import { body, validationResult } from "express-validator";
import { createQueryBuilder } from "typeorm";

exports.validateTileData = [
  body("Name").trim().notEmpty().withMessage("Name field cannot be empty!"),
  body("ItemCode").trim().notEmpty().withMessage("Item code cannot be empty!"),

  body("ItemCode").custom((value) => {
    return createQueryBuilder("tile")
      .where("Tile.ItemCode = :ItemCode", { ItemCode: value })
      .getOne()
      .then((tile) => {
        if (tile) throw new Error("Item code already exists!");
      });
  }),

  body("Quantity")
    .trim()
    .notEmpty()
    .withMessage("Please mention item quantity (Boxes)"),
  body("Price").trim().notEmpty().withMessage("Please write item price"),
  body("Size").trim().notEmpty().withMessage("Please mention size of tile"),
  body("PcsInBox")
    .trim()
    .notEmpty()
    .withMessage("Please mention no of pcs in a box?"),
  body("Company")
    .trim()
    .notEmpty()
    .withMessage("Please mention company name of a tile"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Entered Form data is incorrect",
        errorsArray: errors.array(),
      });
    }
    if (!req.imgURL) {
      return res.status(422).json({
        message: "Please select a valid photo of product",
        errorsArray: [],
      });
    }

    next();
  },
];
