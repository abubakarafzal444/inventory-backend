import { Request, Response, NextFunction } from "express";
import { CustomError } from "../util/custom/classes";
import { createQueryBuilder } from "typeorm";
import { Grout } from "../Entities/Grout";

const getAllGrouts = async (req: Request, res: Response) => {
  try {
    const AllGrouts = await Grout.find();
    if (!AllGrouts) throw new CustomError(404, "No grout was found!");
    return res
      .status(200)
      .json({ data: AllGrouts, message: "Fetching grout data successful" });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later!" });
  }
  return;
};

const getGroutDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createQueryBuilder("grout")
      .where("Grout.ItemCode = :ItemCode", { ItemCode: req.params.ItemCode })
      .getOne()
      .then((grout: any) => {
        console.log(grout);
        if (!grout)
          return res.status(404).json({ message: "no grout was found" });
        return res.status(200).json({
          data: grout,
          message: "Fetching grout details is successful!",
        });
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later!" });
  }
};

const addNewGrout = (req: Request, res: Response, next: NextFunction) => {
  const {
    Name,
    ItemCode,
    Description,
    Quantity,
    Price,
    Note,
    Weight,
    Color,
    Company,
  } = req.body;

  const newGrout = Grout.create({
    Name,
    ItemCode,
    Description,
    Quantity,
    Price,
    Note,
    Weight,
    Color,
    Company,
  });

  newGrout
    .save()
    .then((response) => {
      res.status(201).json({
        data: response,
        message: "New grout has been added to database successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Something went wrong. Please try again later!",
      });
    });
};

export { getAllGrouts, getGroutDetail, addNewGrout };
