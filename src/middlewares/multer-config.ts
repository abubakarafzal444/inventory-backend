import path from "path";
import multer from "multer";

const root = require("require-main-filename")();
//multer configuration
const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(root, "..", "src", "util", "images"));
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Math.random().toString() + "-" + file.originalname);
    // cb(null, file.originalname);
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
const multerMiddleware = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");
export default multerMiddleware;
