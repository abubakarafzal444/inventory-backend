import { Router } from "express";
import { getAllTiles, addNewTile } from "../controllers/Tiles";
import validateTileData from "../validators/tile-validator";

const router = Router();

// GET ./all-tiles
router.get("/all-tiles", getAllTiles);

//POST ./add-tile
router.post("/add-tile", validateTileData, addNewTile);

export { router as AllTilesRoute };
