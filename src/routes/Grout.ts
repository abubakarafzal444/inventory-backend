import { getAllGrouts, addNewGrout } from "../controllers/Grout";
import { Router } from "express";
const router = Router();
//GET ./all-products
router.get("/all-grouts", getAllGrouts);

//POST ./add-grout
router.post("/add-grout", addNewGrout);

export { router as AllGroutRoute };
