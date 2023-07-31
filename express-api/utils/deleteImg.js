import fs from "fs";
import path from "path";

export const deleteImg = (dest, fileName) => {
  try {
    fs.unlinkSync(path.join(dest, fileName));
  } catch (error) {
    null;
  }
};
