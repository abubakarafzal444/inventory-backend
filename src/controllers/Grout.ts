import { Request, Response, NextFunction } from "express";
import { Grout } from "../Entities/Grout";

const getAllGrouts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AllGrouts = await Grout.find();
  res.status(200).json(AllGrouts);
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
    .then((response) => res.status(201).json(newGrout))
    .catch(() => res.status(404).json({ message: "Adding grout failed." }));
};

export { getAllGrouts, addNewGrout };
