import * as search from './search'
import * as pkg from './pkg'
import * as playlist from './playlist'
import * as add from './add'
import * as remove from './remove'
import * as login from './login'
import * as logout from './logout'
import * as create from './create'

export const commands = {
   search,
   pkg,
   playlist,
   add,
   remove,
   login,
   logout,
   create
}

// Validation

Object.keys(commands).forEach(command => {
   if (!commands[command].options || !commands[command].run) {
      throw new Error(`Command ${command} missing definition!`)
   }
})
