import path from "path";
import * as zlib from "zlib";
import fs from "fs";
import {getPathInfo} from "../utils.mjs";

export const compress = async (__dirname, inputFilename, outputFilename) => {
  if (!inputFilename || !outputFilename) {
    throw new Error('Provided an insufficient amount of arguments')
  }
  const pathToInput = path.resolve(__dirname, inputFilename)
  const pathToOutput = path.resolve(__dirname, outputFilename)

  const {isDirectory: isInputDirectory, isFileExist: isInputExist} = getPathInfo(pathToInput)
  const {isFileExist: isOutputExist} = getPathInfo(pathToOutput)
  if (!isInputExist) {
    throw new Error(`Provided invalid path to file. The file ${pathToInput} does not exist.`)
  }
  if (isOutputExist) {
    throw new Error(`Provided invalid path to file. The file ${pathToOutput} already exists.`)
  }
  if (isInputDirectory) {
    throw new Error(`Provided invalid path to file. ${pathToInput} is directory.`)
  }
  return new Promise((resolve) => {
    const compressStream = zlib.createBrotliCompress();
    const readableStream = fs.createReadStream(pathToInput)
    const writableStream = fs.createWriteStream(pathToOutput)
    readableStream.pipe(compressStream).pipe(writableStream)
    compressStream.on('end', () => {
      resolve()
    })
  })
};