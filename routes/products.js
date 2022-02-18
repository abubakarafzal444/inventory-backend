const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/products");

// /all-products
router.get("/all-products", productControllers.getAllProds);

module.exports = router;
