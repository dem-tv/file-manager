import path from "path";
import {getPathInfo} from "../utils.mjs";
import fs from "fs";

export const rename = async (__dirname, oldName, newName) => {
  if (!oldName || !newName) {
    throw new Error('Provided an insufficient amount of arguments')
  }
  const oldFullPath = path.resolve(__dirname, oldName)
  const newFullPath = path.resolve(__dirname, newName)
  const {isFileExist} = getPathInfo(oldFullPath)

  if (!isFileExist) {
    throw new Error(`Provided invalid path to file. The file ${oldFullPath} does not exist.`)
  }

  fs.renameSync(oldFullPath, newFullPath)
};