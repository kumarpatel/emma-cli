import * as search from './search'
import * as pkg from './pkg'
import * as playlist from './playlist'
import * as add from './add'
import * as remove from './remove'
import * as login from './login'
import * as logout from './logout'
import * as create from './create'

interface CommandOptions {
  [key: string]: any
}

interface Flags {
  [flag: string]: boolean
}

type Command = (input: string[], flags: Flags) => Promise<void>

interface CommandInfo {
  options: CommandOptions
  run: Command
}

interface Commands {
  [command: string]: CommandInfo
}

export const commands: Commands = {
  search,
  pkg,
  playlist,
  add,
  remove,
  login,
  logout,
  create,
}
