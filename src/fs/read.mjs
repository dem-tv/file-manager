import path from "path";
import {getFileData} from "../utils.mjs";
import fsp from 'node:fs/promises';

const {__dirname} = getFileData(import.meta.url);

const read = async (pathToFile) => {
    const text = await fsp.readFile(pathToFile, {encoding: "ascii"});
    console.log(text)
};

await read(path.resolve(__dirname, './files/fileToRead.txt'));