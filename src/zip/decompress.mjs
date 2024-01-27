import * as zlib from "zlib";
import fs from "fs";
import path from "path";
import {getPathInfo} from "../utils.mjs";

export const decompress = async (__dirname, inputFilename, outputFilename) => {
  if (!inputFilename || !outputFilename) {
    throw new Error('Provided an insufficient amount of arguments')
  }
  const pathToInput = path.resolve(__dirname, inputFilename)
  const pathToOutput = path.resolve(__dirname, outputFilename)

  const {isDirectory: isInputDirectory, isFileExist: isInputExist} = await getPathInfo(pathToInput)
  const {isFileExist: isOutputExist} = await getPathInfo(pathToOutput)

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
    const decomposeStream = zlib.createBrotliDecompress()
    const readableStream = fs.createReadStream(pathToInput)
    const writableStream = fs.createWriteStream(pathToOutput)
    readableStream.pipe(decomposeStream).pipe(writableStream)
    decomposeStream.on('end', () => {
      resolve()
    })
  })
};