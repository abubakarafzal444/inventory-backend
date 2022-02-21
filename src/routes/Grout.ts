const express = require("express");
const router = express.Router();
const groutController = require("../controllers/Grout");

//GET ./all-products
router.get("/all-grouts", groutController.getAllGrouts);

//POST ./add-grout
router.post("/add-grout", groutController.addNewGrout);

export { router as AllGroutRoute };
