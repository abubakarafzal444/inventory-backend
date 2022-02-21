import { Request, Response, NextFunction } from "express";
import { Tile } from "../Entities/Tile";
exports.getAllTiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const AllTiles = await Tile.find();
    if (AllTiles) {
      return res
        .status(200)
        .json({ data: AllTiles, message: "Fetching tile data successful" });
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later!" });
  }
  return res.status(404).json({ message: "No tile was found! " });
};

exports.addNewTile = (req: Request, res: Response, next: NextFunction) => {
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
  });

  newTile
    .save()
    .then((response) => {
      return res.status(201).json({
        data: response,
        message: "New tile has added to database successfully",
      });
    })
    .catch((err) => console.log(err));
  return res.status(405);
};
