import {compareSort, getFileData} from "./utils.mjs";
import MyFsClass from "./MyFSClass/MyFSClass.mjs";
import os from "os";


const init = () => {
  const usernameArg = process.argv.find(el => el.startsWith('--username=')) || '=incognito'
  const username = usernameArg.split('=')[1]

  const {__dirname} = getFileData(import.meta.url);
  const myFS = new MyFsClass(__dirname)

  MyFsClass.printAvailableCommands()
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
  myFS.printCurrentLocation()
  process.stdout.write(`Enter any command. to exit the program, print .exit or press ctrl+c\n`)

  process.stdin.on('data', async (chunk) => {
    const stringedChunk = chunk.toString().trim()
    const [command, ...params] = stringedChunk.split(/\s+/)

    switch (command) {
      case 'up': {
        myFS.goUp()
        break
      }
      case 'ls': {
        try {
          await myFS.ls(compareSort)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'add': {
        try {
          await myFS.add(...params)
          console.log('file created successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'cat': {
        try {
          await myFS.cat(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'rn': {
        try {
          await myFS.rn(...params)
          console.log('file renamed successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'cp': {
        try {
          await myFS.cp(...params)
          console.log('file copied successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'mv': {
        try {
          await myFS.mv(...params)
          console.log('file moved successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'rm': {
        try {
          await myFS.rm(...params)
          console.log('file removed successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'cd': {
        try {
          await myFS.cd(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'hash': {
        try {
          await myFS.hash(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'compress': {
        try {
          await myFS.compress(...params)
          console.log('file compressed successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'decompress': {
        try {
          await myFS.decompress(...params)
          console.log('file decompressed successfully')
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case '.exit': {
        process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`)
        process.exit(0)
        break
      }
      case 'help': {
        MyFsClass.printAvailableCommands()
        break
      }
      case 'os': {
        switch (params[0] || null) {
          case '--EOL': {
            myFS.eol()
            break
          }
          case '--cpus': {
            myFS.cpus()
            break;
          }
          case '--homedir': {
            myFS.homedir()
            break;
          }
          case '--username': {
            myFS.username()
            break;
          }
          case '--architecture': {
            myFS.architecture()
            break;
          }
          default: {
            console.log(`Passed invalid argument - ${params[0]}`)
          }
        }
        break
      }
      default: {
        console.log(`Passed invalid command - ${command}`)
      }
    }
    myFS.printCurrentLocation()
  })

  process.on("SIGINT", () => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`)
    process.kill(process.pid, 'SIGINT')
  });
}

init()