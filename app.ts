import { createConnection } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Tile } from "./src/Entities/Tile";
import { Grout } from "./src/Entities/Grout";
import { AllGroutRoute } from "./src/routes/Grout";
import { AllTilesRoute } from "./src/routes/Tiles";
import { AllProductsRoute } from "./src/routes/products";
import express from "express";
import bodyParser from "body-parser";
import * as path from "path";
const root = require("require-main-filename")();
//  cb(null, path.join(root, "src", "util", "images"));
const multer = require("multer");

const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./firebaseStorageConfig.json");

const app = express();

//connecting to database
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 6000,
      username: "postgres",
      password: "bcsf20m538",
      database: "inventory",
      entities: [Tile, Grout],
      synchronize: true,
    });
    console.log("connected to postgres");
    app.listen(9000, () => console.log("running on port 9000"));
  } catch {
    console.log("connection failed");
  }
};
main();

//setting headers for CORS (Cross server resource share)
app.use((req: Request, res: any, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

//body-parser middleware
app.use(bodyParser.json());

//multer configuration
const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(root, "..", "src", "util", "images"));
  },
  filename: (req: any, file: any, cb: any) => {
    // cb(null, Math.random().toString() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimeType == "image/png" ||
    file.mimeType == "image/jpg" ||
    file.mimeType == "image/jpeg"
  ) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

//multer middleware
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//firebase setup

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://inventory-29163.appspot.com",
});
const bucket = getStorage().bucket();

//function to upload files to firebase that returns  their url after upload
const uploadFile = async (path: string, filename: string) => {
  const stored = await bucket.upload(path, {
    //set public to false to restrict file access
    public: true,
    destination: filename,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });
  return stored[0].metadata.mediaLink;
};

//niddleware that will upload image if it exists
app.use(async (req: any, res: any, next: any) => {
  if (req.file) {
    uploadFile(req.file.path, req.file.filename)
      .then((ret) => {
        req.imgURL = ret;
        next();
      })
      .catch(() =>
        res.status(500).json({
          message: "Something went wrong. Please try again later!",
        })
      );
  } else next();
});

//app or api routes
app.use(AllProductsRoute);
app.use(AllTilesRoute);
app.use(AllGroutRoute);
