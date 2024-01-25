import path from "path";
import fs from "fs";
import {availableCommands} from "./constants.js";
import os from "os";
import * as crypto from "crypto";
import zlib from "zlib";
import {getPathInfo} from "../utils.js";

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
    if (!copyFilename || !destination) {
      throw new Error('Provided an insufficient amount of arguments')
    }
    const copyFullPath = path.resolve(this.__dirname, copyFilename)
    const destinationFullPath = path.resolve(this.__dirname, destination, copyFilename)
    const {isFileExist: isCopyFileExist, isDirectory} = getPathInfo(copyFullPath)
    const {isFileExist: isNewFileExist} = getPathInfo(destinationFullPath)
    if (!isCopyFileExist) {
      throw new Error(`Provided invalid path to file. The path ${copyFullPath} does not exist.`)
    }
    if (isDirectory) {
      throw new Error(`Provided invalid path to file. ${copyFullPath} is directory.`)
    }
    if (isNewFileExist) {
      throw new Error(`The file ${destinationFullPath} already exists.`)
    }

    return new Promise((resolve, reject) => {
      this.add(destinationFullPath)
      const readable = fs.createReadStream(copyFullPath)
      const writable = fs.createWriteStream(destinationFullPath)
      readable.pipe(writable)
      writable.on('finish', () => {
        resolve()
      })
    })
  }

  mv = (moveFilename, destination) => {
    const moveFilenamePath = path.resolve(this.__dirname, moveFilename)
    return new Promise(resolve => {
      this.cp(moveFilename, destination).then(() => {
        fs.unlinkSync(moveFilenamePath)
        resolve()
      })
    })
  }

  rn = (oldName, newName) => {
    if (!oldName || !newName) {
      throw new Error('Provided an insufficient amount of arguments')
    }
    const oldFullPath = path.resolve(this.__dirname, oldName)
    const newFullPath = path.resolve(this.__dirname, newName)
    const {isFileExist} = getPathInfo(oldFullPath)

    if (!isFileExist) {
      throw new Error(`Provided invalid path to file. The file ${oldFullPath} does not exist.`)
    }

    fs.renameSync(oldFullPath, newFullPath)
  }

  rm = (filename) => {
    const fullPath = path.resolve(this.__dirname, filename)
    fs.unlinkSync(fullPath)
  }

  cat = (filename) => {
    const pathToFile = path.resolve(this.__dirname, filename)
    return new Promise((resolve) => {
      if (!filename) {
        throw new Error('No file was provided.')
      }
      const {isDirectory, isFileExist} = getPathInfo(pathToFile)
      if (!isFileExist) {
        throw new Error(`Provided invalid path to file. The file ${pathToFile} does not exist.`)
      }
      if (isDirectory) {
        throw new Error(`Provided invalid path to file. ${pathToFile} is directory.`)
      }
      const readable = fs.createReadStream(pathToFile)
      readable.pipe(process.stdout)
      readable.on('end', () => {
        process.stdout.write('\n')
        resolve()
      })
    })
  }

  add = (filename) => {
    if (!filename) {
      throw new Error('No file was provided.')
    }
    fs.appendFileSync(path.resolve(this.__dirname, filename), '')
  }

  ls = async (compareSort) => {
    const allFiles = fs.readdirSync(this.__dirname)
    const {dirs, files} = allFiles.reduce((acc, file) => {
      const filePath = path.resolve(this.__dirname, file)
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
    return new Promise((resolve) => {
      const pathToFile = path.resolve(this.__dirname, filename)
      const fd = fs.createReadStream(pathToFile);
      const hash = crypto.createHash('sha256');
      hash.setEncoding('hex');
      fd.pipe(hash).pipe(process.stdout);
      fd.on('end', function () {
        resolve()
        process.stdout.write('\n')
      });
    })
  }

  compress = (inputFilename, outputFilename) => {
    return new Promise((resolve) => {
      const pathToInput = path.resolve(this.__dirname, inputFilename)
      const pathToOutput = path.resolve(this.__dirname, outputFilename)
      const compressStream = zlib.createBrotliCompress();
      const readableStream = fs.createReadStream(pathToInput)
      const writableStream = fs.createWriteStream(pathToOutput)
      readableStream.pipe(compressStream).pipe(writableStream)
      compressStream.on('end', () => {
        resolve()
      })
    })
  }

  decompress = (inputFilename, outputFilename) => {
    return new Promise((resolve) => {
      const pathToInput = path.resolve(this.__dirname, inputFilename)
      const pathToOutput = path.resolve(this.__dirname, outputFilename)
      const decomposeStream = zlib.createBrotliDecompress()
      const readableStream = fs.createReadStream(pathToInput)
      const writableStream = fs.createWriteStream(pathToOutput)
      readableStream.pipe(decomposeStream).pipe(writableStream)
      decomposeStream.on('end', () => {
        resolve()
      })
    })
  }
}

export default MyFsClass