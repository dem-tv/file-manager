import {getPathInfo} from "../utils.mjs";
import path from "path";
import fs from "fs";

export const list = async (__dirname, compareSort) => {
  const allFiles = fs.readdirSync(__dirname)
  const {dirs, files} = allFiles.reduce((acc, file) => {
    const filePath = path.resolve(__dirname, file)
    const {isDirectory} = getPathInfo(filePath)
    if (isDirectory) {
      return {...acc, dirs: [...acc.dirs, {type: 'directory', name: file}]}
    } else {
      return {...acc, files: [...acc.files, {type: 'file', name: file}]}
    }
  }, {dirs: [], files: []})

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