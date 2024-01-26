import fs from 'fs';
import * as path from "path";
import {getFileData, getPathInfo} from "../utils.mjs";

export const cat = async (__dirname, filename) => {
  const pathToFile = path.resolve(__dirname, filename)
  return new Promise((resolve) => {
    if (!filename) {
      throw new Error('No file was provided.')
    }
    const {isDirectory, isFileExist} = getPathInfo(pathToFile)
    if (!isFileExist) {
      throw new Error(`Provided invalid path to file. The file ${pathToFile} does not exist.`)
    }
    if (isDirectory) {
      throw new Error(`Provided invalid path to file. ${pathToFile} is directory.`)
    }
    const readable = fs.createReadStream(pathToFile)
    readable.pipe(process.stdout)
    readable.on('end', () => {
      process.stdout.write('\n')
      resolve()
    })
  })
};
