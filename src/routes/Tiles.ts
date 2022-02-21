const express = require("express");
const router = express.Router();
const tilesController = require("../controllers/Tiles");
const { validateTileData } = require("../validators/tile-validator");

// GET ./all-tiles
router.get("/all-tiles", tilesController.getAllTiles);

//POST ./add-tile
router.post("/add-tile", validateTileData, tilesController.addNewTile);

export { router as AllTilesRoute };
