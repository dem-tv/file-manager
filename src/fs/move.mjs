import path from "path";
import {getFileData} from "../utils.mjs";
import {copy} from "./copy.mjs";
import fsp from 'node:fs/promises';

const {__dirname} = getFileData(import.meta.url);

export const move = async (__dirname, moveFilename, destination) => {
  const moveFilenamePath = path.resolve(__dirname, moveFilename)
  await copy(__dirname, moveFilename, destination)
  await fsp.unlink(moveFilenamePath)
};