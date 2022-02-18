import { Request, Response, NextFunction } from "express";
import { Product } from "../Entities/Product";

exports.getAllProds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AllProducts = await Product.find();
  res.status(200).json(AllProducts);
};
