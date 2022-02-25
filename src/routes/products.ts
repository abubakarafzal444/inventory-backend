import { getAllProds } from "../controllers/products";
import { Router } from "express";
const router = Router();
//GET ./all-products
router.get("/all-products", getAllProds);

export { router as AllProductsRoute };
