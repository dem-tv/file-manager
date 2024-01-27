import fsp from 'node:fs/promises';
import path from "path";

export const remove = (__dirname, pathToFile) => {
  const fullPath = path.resolve(__dirname, pathToFile)
  return fsp.unlink(fullPath)
};