const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/products");

//GET ./all-products
router.get("/all-products", productControllers.getAllProds);

export { router as AllProductsRoute };
