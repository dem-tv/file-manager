import {getFileData} from "../utils.js";
import path from "path";
import fs from "fs";

const {__dirname} = getFileData(import.meta.url);

export const list = async (filesDirPath) => {
  try {
    const files = fs.readdirSync(filesDirPath)
    return files
  } catch (err) {
    throw new Error('FS operation failed')
  }
};