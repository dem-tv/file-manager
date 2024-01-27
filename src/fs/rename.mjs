import path from "path";
import {getPathInfo} from "../utils.mjs";
import fsp from 'node:fs/promises';

export const rename = async (__dirname, oldName, newName) => {
  if (!oldName || !newName) {
    throw new Error('Provided an insufficient amount of arguments')
  }
  const oldFullPath = path.resolve(__dirname, oldName)
  const newFullPath = path.resolve(__dirname, newName)
  const {isFileExist: isOldFileExist} = await getPathInfo(oldFullPath)
  const {isFileExist: isNewFileExist} = await getPathInfo(newFullPath)

  if (!isOldFileExist) {
    throw new Error(`Provided invalid path to file. The file ${isOldFileExist} does not exist.`)
  }
  if (isNewFileExist) {
    throw new Error(`The file ${newFullPath} already exists.`)
  }

  await fsp.rename(oldFullPath, newFullPath)
};