import path from "path";
import {getFileData} from "../utils.js";
import fs from "fs";

const {__dirname} = getFileData(import.meta.url);

const rename = async (folderPath, oldName, newName) => {
  try {
    const oldFullPath = path.resolve(folderPath, oldName)
    const newFullPath = path.resolve(folderPath, newName)
    fs.renameSync(oldFullPath, newFullPath)
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await rename(path.resolve(__dirname, 'files'), 'wrongFilename.txt', 'properFilename.md');