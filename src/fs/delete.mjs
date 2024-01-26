import fs from "fs";
import path from "path";

export const remove = async (__dirname, pathToFile) => {
  const fullPath = path.resolve(__dirname, pathToFile)
  fs.unlinkSync(fullPath)
};