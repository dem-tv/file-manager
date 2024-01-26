import fs from "fs"
import path from "path";
import crypto from "crypto";
import {getPathInfo} from "../utils.mjs";

export const calculateHash = async (__dirname, pathToFile) => {
  if (!pathToFile) {
    throw new Error('Provided an insufficient amount of arguments')
  }

  const fullPathToFile = path.resolve(__dirname, pathToFile)

  const {isDirectory, isFileExist} = getPathInfo(fullPathToFile)

  if (!isFileExist) {
    throw new Error(`Provided invalid path to file. The file ${fullPathToFile} does not exist.`)
  }

  if (isDirectory) {
    throw new Error(`Provided invalid path to file. ${fullPathToFile} is directory.`)
  }

  return new Promise((resolve) => {
    const fd = fs.createReadStream(fullPathToFile);
    const hash = crypto.createHash('sha256');
    hash.setEncoding('hex');
    fd.pipe(hash).pipe(process.stdout);
    fd.on('end', function () {
      resolve()
      process.stdout.write('\n')
    });
  })
};