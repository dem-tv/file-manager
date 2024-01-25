import fs from "fs";
import {getFileData} from "../utils.js";
import path from "path";

const {__dirname} = getFileData(import.meta.url);

const remove = async (pathToFile) => {
  try {
    if (!fs.existsSync(pathToFile)) {
      throw new Error('FS operation failed')
    }
    fs.unlinkSync(pathToFile)
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await remove(path.resolve(__dirname, 'files/fileToRemove.txt'));