#!/usr/bin/env node

import meow from 'meow'
import updateNotifier from 'update-notifier'

import { commands } from './commands'

// Helpers

const shift = ([_, ...xs]) => xs
const first = ([x, ..._]) => x

// CLI

const cli = meow(`
   Usage
     $ emma [<command>]

   Commands
     $ ${Object.keys(commands)}

   Options
     -- help: get help with command

   Powered by Algolia, Prisma and Zeit.
`, {
   autoHelp: false
})

updateNotifier({ pkg: cli.pkg }).notify()

// Commands

function main(cli) {
   const { input, flags } = cli

   // Defaults

   if (input.length === 0) {
      if (flags.help) {
         return cli.showHelp()
      }
      return commands.search.run(shift(input), flags)
   }

   const command = commands[first(input)]

   if (!command) {
      return cli.showHelp()
   }

   const subcli = meow(command.options)

   return command.run(shift(subcli.input), subcli.flags)
}

main(cli)
