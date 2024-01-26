import path from "path";
import {getFileData} from "../utils.mjs";
import fs from "fs";
import {copy} from "./copy.mjs";

const {__dirname} = getFileData(import.meta.url);

export const move = async (__dirname, moveFilename, destination) => {
  const moveFilenamePath = path.resolve(__dirname, moveFilename)
  return new Promise(resolve => {
    copy(moveFilename, destination).then(() => {
      fs.unlinkSync(moveFilenamePath)
      resolve()
    })
  })
};