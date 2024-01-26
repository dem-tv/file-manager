import path from "path";
import {availableCommands} from "./constants.mjs";
import os from "os";
import {getPathInfo} from "../utils.mjs";
import {compress} from "../zip/compress.mjs";
import {decompress} from "../zip/decompress.mjs";
import {calculateHash} from "../hash/calcHash.mjs";
import {list} from "../fs/list.mjs";
import {create} from "../fs/create.mjs";
import {cat} from "../fs/cat.mjs";
import {remove} from "../fs/delete.mjs";
import {copy} from "../fs/copy.mjs";
import {move} from "../fs/move.mjs";
import {rename} from "../fs/rename.mjs";

class MyFsClass {
  constructor(rootDirectory) {
    this.__dirname = rootDirectory
  }

  printCurrentLocation = () => {
    process.stdout.write(`You are currently in ${this.__dirname}\n`)
  }

  goUp = () => {
    this.__dirname = path.resolve(this.__dirname, '../')
  }

  cd = (dirname) => {
    if (!dirname) {
      throw new Error('No path was provided.')
    }
    const newPath = path.resolve(this.__dirname, dirname)
    const {isFileExist, isDirectory} = getPathInfo(newPath)
    if (!isFileExist) {
      throw new Error(`Provided invalid path to directory. The path ${newPath} does not exist.`)
    }
    if (!isDirectory) {
      throw new Error(`Provided invalid path to directory. ${newPath} is not directory.`)
    }
    this.__dirname = newPath
  }

  cp = (copyFilename, destination) => {
    return copy(this.__dirname, copyFilename, destination)
  }

  mv = (moveFilename, destination) => {
    return move(this.__dirname, moveFilename, destination)
  }

  rn = (oldName, newName) => {
    return rename(this.__dirname, oldName, newName)
  }

  rm = (filename) => {
    return remove(this.__dirname, filename)
  }

  cat = (filename) => {
    return cat(this.__dirname, filename)
  }

  add = (filename) => {
    return create(this.__dirname, filename)
  }

  ls = (compareSort) => {
    return list(this.__dirname, compareSort)
  }

  printAvailableCommands = () => {
    console.log('Available commands:')
    console.table(
      availableCommands.map(command => {
        return {
          "Command": command.name,
          "Description": command.description,
        };
      })
    );
  }

  eol = () => {
    process.stdout.write(`Default system End-Of-Line - ${JSON.stringify(os.EOL)}\n`)
  }

  cpus = () => {
    const cpuCores = os.cpus()
    console.log(`Amount of cpus: ${cpuCores.length}`)
    cpuCores.forEach((cpu, i) => {
      console.log(`${i + 1}: model - ${cpu.model}, clock rate (in GHz) - ${cpu.speed}`)
    })
  }

  homedir = () => {
    console.log(`Home directory - ${os.homedir()}`)
  }

  username = () => {
    console.log(`Home directory - ${os.userInfo().username}`)
  }

  architecture = () => {
    console.log(`CPU architecture for which Node.js binary has compiled - ${process.env['PROCESSOR_ARCHITECTURE']}`)
  }

  hash = (filename) => {
    return calculateHash(this.__dirname, filename)
  }

  compress = (inputFilename, outputFilename) => {
    return compress(this.__dirname, inputFilename, outputFilename)
  }

  decompress = (inputFilename, outputFilename) => {
    return decompress(this.__dirname, inputFilename, outputFilename)
  }
}

export default MyFsClass