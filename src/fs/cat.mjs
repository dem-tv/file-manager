import fs from 'fs';
import * as path from "path";
import {getPathInfo} from "../utils.mjs";

export const cat = async (__dirname, filename) => {
  const pathToFile = path.resolve(__dirname, filename)
  if (!filename) {
    throw new Error('No file was provided.')
  }
  const {isDirectory, isFileExist} = await getPathInfo(pathToFile)
  if (!isFileExist) {
    throw new Error(`Provided invalid path to file. The file ${pathToFile} does not exist.`)
  }
  if (isDirectory) {
    throw new Error(`Provided invalid path to file. ${pathToFile} is directory.`)
  }
  return new Promise((resolve) => {
    const readable = fs.createReadStream(pathToFile)
    readable.pipe(process.stdout)
    readable.on('end', () => {
      process.stdout.write('\n')
      resolve()
    })
  })
};
