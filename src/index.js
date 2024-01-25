import {compareSort, getFileData} from "./utils.js";
import MyFsClass from "./MyFSClass/MyFSClass.js";
import os from "os";


const init = () => {
  const usernameArg = process.argv.find(el => el.startsWith('--username=')) || '=incognito'
  const username = usernameArg.split('=')[1]

  const {__dirname} = getFileData(import.meta.url);
  const myFS = new MyFsClass(__dirname)

  process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
  myFS.printCurrentLocation()
  myFS.printAvailableCommands()

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
          await myFS.lcds(compareSort)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'add': {
        try {
          myFS.add(...params)
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
          myFS.rn(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'cp': {
        try {
          await myFS.cp(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'mv': {
        try {
          await myFS.mv(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'rm': {
        try {
          myFS.rm(...params)
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'cd': {
        try {
          myFS.cd(...params)
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
        } catch (err) {
          console.log(err.message)
        }
        break
      }
      case 'decompress': {
        try {
          await myFS.decompress(...params)
        } catch (err) {
          console.log(err.message)
        }
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

  // process.stdin.on('keypress', (chunk, key) => {
  //   if(key && key.name === "c" && key.ctrl) {
  //     console.log(`Thank you for using File Manager, ${username}, goodbye!\n`);
  //     process.kill(process.pid, 'SIGINT')
  //   }
  //
  //   // console.log(chunk, key)
  //   // process.stdout.write(`You are currently in ${__dirname}\n`)
  // })

  // process.on("SIGINT", () => {
  //   process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`)
  //   process.kill(process.pid, 'SIGINT')
  // });
}

init()