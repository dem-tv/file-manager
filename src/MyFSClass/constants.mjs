export const availableCommands = [
  {
    name: 'up',
    description: 'Go upper from current directory'
  },
  {
    name: 'cd path_to_directory',
    description: "Go to dedicated folder from current directory"
  },
  {
    name: 'ls',
    description: 'Print a list of all files and folders in current directory'
  },
  {
    name: 'cat path_to_file',
    description: 'Read file and print it\'s content in the console'
  },
  {
    name: 'add new_file_name',
    description: 'Create empty file in current working directory'
  },
  {
    name: 'rn path_to_file new_filename',
    description: 'Rename file'
  },
  {
    name: 'cp path_to_file path_to_new_directory',
    description: 'Copy file'
  },
  {
    name: 'mv path_to_file path_to_new_directory',
    description: 'Move file'
  },
  {
    name: 'rm path_to_file',
    description: 'Delete file'
  },
  {
    name: 'hash path_to_file',
    description: 'Calculate hash for file and print it into console'
  },
  {
    name: 'compress path_to_file path_to_destination',
    description: 'Compress file (using Brotli algorithm)'
  },
  {
    name: 'decompress path_to_file path_to_destination',
    description: 'Decompress file (using Brotli algorithm)'
  },
  {
    name: 'os --EOL',
    description: 'Get EOL (default system End-Of-Line)'
  },
  {
    name: 'os --cpus',
    description: 'Get host machine CPUs info'
  },
  {
    name: 'os --homedir',
    description: 'Get home directory'
  },
  {
    name: 'os --username',
    description: 'Get current system user name'
  },
  {
    name: 'os --architecture',
    description: 'Get CPU architecture for which Node.js binary has compiled'
  },
  {
    name: '.exit',
    description: 'Close program'
  },
  {
    name: 'help',
    description: 'Print all commands into console'
  },
]