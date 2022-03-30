import { Router } from "express";
import { getAllTiles, addNewTile, getTileDetail } from "../controllers/Tiles";
import validateTileData from "../validators/tile-validator";

const router = Router();

// GET ./all-tiles
router.get("/all-tiles", getAllTiles);

// GET ./tile-detail/:id
router.get("/tile-detail/:ItemCode", getTileDetail);

//POST ./add-tile
router.post("/add-tile", validateTileData, addNewTile);

export { router as AllTilesRoute };
