const fs = require("fs");
const path = require("path");
const root = require("require-main-filename")();
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");

const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("../../firebaseStorageConfig.json");

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

//middleware that will upload image if it exists
exports.firebaseUpload = (req: any, res: any, next: any) => {
  if (req.file) {
    uploadFile(req.file.path, req.file.filename)
      .then((ret) => {
        req.imgURL = ret;
        fs.unlinkSync(
          path.join(root, "..", "src", "util", "images", req.file.filename)
        );
        next();
      })
      .catch((err) => {
        res.status(500).json({
          message: "Image storage error. Please try again later!",
        });
      });
  }
};
