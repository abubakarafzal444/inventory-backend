import * as path from "path";
const root = require("require-main-filename")();
const multer = require("multer");
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
exports.multerMiddleware = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");
