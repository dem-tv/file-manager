import {fileURLToPath} from 'url';
import {dirname} from 'path';

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
