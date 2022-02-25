import * as fs from "fs";
import * as path from "path";
import { getStorage } from "firebase-admin/storage";
import { v4 as uuid } from "uuid";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = require("../../firebaseStorageConfig.json");
const root = require("require-main-filename")();

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
      firebaseStorageDownloadTokens: uuid(),
    },
  });
  return stored[0].metadata.mediaLink;
};

//middleware that will upload image if it exists
const firebaseUpload = (req: any, res: any, next: any) => {
  if (req.file) {
    uploadFile(req.file.path, req.file.filename)
      .then((ret) => {
        req.body.ImageURL = ret;
        fs.unlinkSync(
          path.join(root, "..", "src", "util", "images", req.file.filename)
        );
        next();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Image storage error. Please try again later!",
        });
      });
  } else next();
  // return res.status(500).json({
  //   message: "Image storage error. Please try again later!",
  // });
};
export default firebaseUpload;
