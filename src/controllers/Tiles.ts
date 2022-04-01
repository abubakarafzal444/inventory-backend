import { Request, Response, NextFunction } from "express";
import { createQueryBuilder } from "typeorm";
import { Tile } from "../Entities/Tile";
import { CustomError } from "../util/custom/classes";

const getAllTiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const AllTiles = await Tile.find();
    if (!AllTiles) throw new CustomError(404, "No tile was found!");

    return res
      .status(200)
      .json({ data: AllTiles, message: "Fetching tile data successful" });
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
const getTileDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createQueryBuilder("tile")
      .where("Tile.ItemCode = :ItemCode", { ItemCode: req.params.ItemCode })
      .getOne()
      .then((tile: any) => {
        if (!tile)
          return res.status(404).json({ message: "no tile was found" });
        return res.status(200).json({
          data: tile,
          message: "Fetching tile details is successful!",
        });
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later!" });
  }
};

const addNewTile = (req: Request, res: Response, next: NextFunction) => {
  const {
    Name,
    ItemCode,
    Description,
    Quantity,
    Price,
    Note,
    Size,
    Shade,
    Finishing,
    TileType,
    PcsInBox,
    Company,
    ImageURL,
  } = req.body;

  const newTile = Tile.create({
    Name,
    ItemCode,
    Description,
    Quantity,
    Price,
    Note,
    Size,
    Shade,
    Finishing,
    TileType,
    PcsInBox,
    Company,
    ImageURL,
  });

  newTile
    .save()
    .then((response) => {
      res.status(201).json({
        data: response,
        message: "New tile has been added to database successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Something went wrong. Please try again later!",
      });
    });
};
export { getAllTiles, getTileDetail, addNewTile };
