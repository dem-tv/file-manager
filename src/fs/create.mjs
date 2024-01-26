import fs from 'fs';
import * as path from "path";
import {getFileData} from "../utils.mjs";

export const create = (__dirname, filename) => {
  if (!filename) {
    throw new Error('No file was provided.')
  }
  fs.appendFileSync(path.resolve(__dirname, filename), '')
};