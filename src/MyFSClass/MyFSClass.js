import path from "path";
import fs from "fs";
import {list} from "../fs/list.js";
import {availableCommands} from "./constants.js";
import os from "os";
import * as crypto from "crypto";
import zlib from "zlib";

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
    this.__dirname = path.resolve(this.__dirname, dirname)
  }

  cp = (copyFilename, newFilename) => {
    return new Promise((resolve, reject) => {
      try {
        const copyFullPath = path.resolve(this.__dirname, copyFilename)
        const newFullPath = path.resolve(this.__dirname, newFilename)
        this.add(newFullPath)
        const readable = fs.createReadStream(copyFullPath)
        const writable = fs.createWriteStream(newFullPath)
        const a = readable.pipe(writable)
        writable.on('finish', () => {
          resolve()
        })
      } catch (err) {
        console.log(err)
      }
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
    const oldFullPath = path.resolve(this.__dirname, oldName)
    const newFullPath = path.resolve(this.__dirname, newName)
    fs.renameSync(oldFullPath, newFullPath)
  }

  rm = (filename) => {
    const fullPath = path.resolve(this.__dirname, filename)
    fs.unlinkSync(fullPath)
  }

  cat = (pathToFile) => {
    return new Promise((resolve) => {
      const readable = fs.createReadStream(path.resolve(this.__dirname, pathToFile))
      readable.pipe(process.stdout)
      readable.on('end', () => {
        process.stdout.write('\n')
        resolve()
      })
    })
  }

  add = (filename) => {
    fs.appendFileSync(path.resolve(this.__dirname, filename), '')
  }

  ls = async (compareSort) => {
    const allFiles = fs.readdirSync(this.__dirname)
    const {dirs, files} = allFiles.reduce((acc, file) => {
      const filePath = path.resolve(this.__dirname, file)
      if (fs.lstatSync(filePath).isDirectory()) {
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