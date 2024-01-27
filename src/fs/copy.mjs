import fs from 'fs';
import * as path from "path";
import {getPathInfo} from "../utils.mjs";
import {create} from "./create.mjs";

export const copy = async (__dirname, copyFilename, destination) => {
  if (!copyFilename || !destination) {
    throw new Error('Provided an insufficient amount of arguments')
  }
  const copyFullPath = path.resolve(__dirname, copyFilename)
  const destinationFullPath = path.resolve(__dirname, destination, copyFilename)
  const {isFileExist: isCopyFileExist, isDirectory} = await getPathInfo(copyFullPath)
  const {isFileExist: isNewFileExist} = await getPathInfo(destinationFullPath)
  if (!isCopyFileExist) {
    throw new Error(`Provided invalid path to file. The path ${copyFullPath} does not exist.`)
  }
  if (isDirectory) {
    throw new Error(`Provided invalid path to file. ${copyFullPath} is directory.`)
  }
  if (isNewFileExist) {
    throw new Error(`The file ${destinationFullPath} already exists.`)
  }

  await create(__dirname, destinationFullPath)

  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(copyFullPath)
    const writable = fs.createWriteStream(destinationFullPath)
    readable.pipe(writable)
    writable.on('finish', () => {
      resolve()
    })
  })
};
