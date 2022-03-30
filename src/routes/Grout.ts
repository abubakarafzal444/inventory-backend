import {
  getAllGrouts,
  addNewGrout,
  getGroutDetail,
} from "../controllers/Grout";
import { Router } from "express";
import validateGroutData from "../validators/grout-validator";
const router = Router();

//GET ./all-products
router.get("/all-grouts", getAllGrouts);

// GET ./grout-detail/:id
router.get("/grout-detail/:ItemCode", getGroutDetail);

//POST ./add-grout
router.post("/add-grout", validateGroutData, addNewGrout);

export { router as AllGroutRoute };
