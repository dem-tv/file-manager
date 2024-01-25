import fs from 'fs';
import * as path from "path";
import {getFileData} from "../utils.js";

const {__dirname} = getFileData(import.meta.url);

const create = async (pathToFile) => {
  try {
    if (fs.existsSync(pathToFile)) {
      throw new Error('FS operation failed')
    }
    fs.appendFileSync(pathToFile, 'I am fresh and young')
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await create(path.resolve(__dirname, './files/fresh.txt'));