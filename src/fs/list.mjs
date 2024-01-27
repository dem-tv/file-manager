import {getPathInfo} from "../utils.mjs";
import path from "path";
import fsp from 'node:fs/promises';

const collectFiles = async (allFiles, __dirname) => {
  const dirs = [], files = []

  for(let i = 0; i < allFiles.length; i++){
    const file = allFiles[i];
    const filePath = path.resolve(__dirname, file)
    const {isDirectory} = await getPathInfo(filePath)

    if (isDirectory) {
     dirs.push({type: 'directory', name: file})
    } else {
     files.push({type: 'file', name: file})
    }
  }
  return {dirs, files}
}

export const list = async (__dirname, compareSort) => {
  const allFiles = await fsp.readdir(__dirname)
  const {dirs, files} = await collectFiles(allFiles, __dirname)

  dirs.sort((a, b) => compareSort(a.name, b.name))
  files.sort((a, b) => compareSort(a.name, b.name))
  console.table(
    dirs.concat(files).map(file => {
      return {
        "Name": file.name,
        "Type": file.type,
      };
    })
  );
}