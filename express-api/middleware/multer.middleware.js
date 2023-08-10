import multer from "multer";
import { ApiError } from "../utils/api_errors.js";

export const singleImgMiddleware = (dest, fieldName, optional = false) =>
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, dest);
      },
      filename: function (req, file, cb) {
        const id = Date.now();
        cb(null, `${id}.png`);
      },
    }),
    fileFilter: function (req, file, cb) {
      if (!file.mimetype.startsWith("image"))
        cb(new ApiError("invalid format", 406));
      cb(null, true);
    },
  }).single(fieldName);
