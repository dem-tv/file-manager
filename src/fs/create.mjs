import fsp from 'node:fs/promises';
import * as path from "path";
import {getPathInfo} from "../utils.mjs";

export const create = async (__dirname, filename) => {
  if (!filename) {
    throw new Error('No file was provided.')
  }
  const fullPath = path.resolve(__dirname, filename)
   const {isFileExist} = await getPathInfo(fullPath)
  if(isFileExist){
    throw new Error(`Provided invalid path to file. The file ${fullPath} already exists.`)
  }

  await fsp.appendFile(fullPath, '')
};