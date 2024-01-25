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
        myFS.printCurrentLocation()
        break
      }
      case 'ls': {
        await myFS.ls(compareSort)
        myFS.printCurrentLocation()
        break
      }
      case 'add': {
        myFS.add(params[0])
        myFS.printCurrentLocation()
        break
      }
      case 'cat': {
        await myFS.cat(params.join(' '))
        myFS.printCurrentLocation()
        break
      }
      case 'rn': {
        myFS.rn(params[0], params[1])
        myFS.printCurrentLocation()
        break
      }
      case 'cp': {
        await myFS.cp(params[0], params[1])
        myFS.printCurrentLocation()
        break
      }
      case 'mv': {
        await myFS.mv(params[0], params[1])
        myFS.printCurrentLocation()
        break
      }
      case 'rm': {
        myFS.rm(params[0])
        myFS.printCurrentLocation()
        break
      }
      case 'cd': {
        myFS.cd(params[0])
        myFS.printCurrentLocation()
        break
      }
      case 'hash': {
        await myFS.hash(params[0])
        myFS.printCurrentLocation()
        break
      }
      case 'compress': {
        await myFS.compress(params[0], params[1])
        myFS.printCurrentLocation()
        break
      }
      case 'decompress': {
        await myFS.decompress(params[0], params[1])
        myFS.printCurrentLocation()
        break
      }
      case 'os': {
        const arg = params[0] || null
        switch (arg) {
          case '--EOL': {
            myFS.eol()
            myFS.printCurrentLocation()
            break
          }
          case '--cpus': {
            myFS.cpus()
            myFS.printCurrentLocation()
            break;
          }
          case '--homedir': {
            myFS.homedir()
            myFS.printCurrentLocation()
            break;
          }
          case '--username': {
            myFS.username()
            myFS.printCurrentLocation()
            break;
          }
          case '--architecture': {
            myFS.architecture()
            myFS.printCurrentLocation()
            break;
          }
          default: {
            console.log(`Passed invalid argument - ${params[0]}`)
            myFS.printCurrentLocation()
          }
        }
        break
      }
      default: {
        console.log(`Passed invalid command - ${command}`)
        myFS.printCurrentLocation()
      }
    }
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