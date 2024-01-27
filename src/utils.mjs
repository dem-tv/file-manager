import {fileURLToPath} from 'url';
import {dirname} from 'path';
import fsp from 'node:fs/promises';

export const getFileData = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  return {__dirname, __filename}
}

export const compareSort = (s1, s2) => {
  if (s1 < s2)
    return -1;
  if (s1 > s2)
    return 1;
  return 0;
}

export const getPathInfo = async (path) => {
  try {
    const s = await fsp.stat(path)
    const isDirectory = s.isDirectory()

    return {
      isFileExist: true,
      isDirectory
    }
  } catch (err) {
    if (err.errno === -4058) {
      return {
        isFileExist: false,
        isDirectory: false
      }
    } else {
      console.log(err)
      throw new Error(err)
    }
  }
}
