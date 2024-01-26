import path from "path";
import {getFileData} from "../utils.mjs";
import fs from "fs";

const {__dirname} = getFileData(import.meta.url);

const read = async (pathToFile) => {
  try {
    const text = fs.readFileSync(pathToFile, {encoding: "ascii"});
    console.log(text)
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await read(path.resolve(__dirname, './files/fileToRead.txt'));