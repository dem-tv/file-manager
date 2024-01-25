import fs from 'fs';
import * as path from "path";
import {getFileData} from "../utils.js";

const {__dirname} = getFileData(import.meta.url);

const copy = async (filesDirPath, filesCopyDirPath) => {
  try {
    if (!fs.existsSync(filesDirPath)) {
      throw new Error('FS operation failed')
    }
    fs.mkdirSync(filesCopyDirPath)
    const files = fs.readdirSync(filesDirPath)
    files.forEach(file => {
      const copyResultPath = path.resolve(filesCopyDirPath, file)
      const filePath = path.resolve(filesDirPath, file)
      fs.copyFileSync(filePath, copyResultPath)
    })
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await copy(path.resolve(__dirname, './files'), path.resolve(__dirname, './files_copy'));
