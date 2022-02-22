const express = require("express");
const router = express.Router();
const tilesController = require("../controllers/Tiles");
const { validateTileData } = require("../validators/tile-validator");
const { firebaseUpload } = require("../middlewares/firebase-upload");

// GET ./all-tiles
router.get("/all-tiles", tilesController.getAllTiles);

//POST ./add-tile
router.post(
  "/add-tile",
  validateTileData,
  // firebaseUpload,
  tilesController.addNewTile
);

export { router as AllTilesRoute };
