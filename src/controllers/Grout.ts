import { Request, Response, NextFunction } from "express";
import { Grout } from "../Entities/Grout";

exports.getAllGrouts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AllGrouts = await Grout.find();
  res.status(200).json(AllGrouts);
};

exports.addNewGrout = (req: Request, res: Response, next: NextFunction) => {
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
      console.log(response);
      return res.status(201).json(newGrout);
    })
    .catch((err) => console.log(err));
  return res.status(404);
};
