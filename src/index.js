#!/usr/bin/env node

import meow from 'meow'
import updateNotifier from 'update-notifier'

import { commands } from './commands'

// CLI -----------------------------------------------------------------------

const cli = meow(
  `
   Usage
     $ emma [<command>]
   Commands
     $ ${Object.keys(commands)}
   Options
     -- help: get help with command
   Powered by Algolia, Prisma and Zeit.
`,
  {
    autoHelp: false,
  }
)

// Update Notifier -----------------------------------------------------------

updateNotifier({ pkg: cli.pkg }).notify()

// Command -------------------------------------------------------------------

const shift = ([_, ...xs]) => xs
const head = ([x, ..._]) => x

async function main({ input, flags }) {
  if (input.length === 0) {
    if (flags.help) {
      await cli.showHelp()
    } else {
      await commands.search.run(shift(input), flags)
    }
    process.exit()
  }

  const command = commands[head(input)]

  if (!command) {
    await cli.showHelp()
  } else {
    const subcli = meow(command.options)
    await command.run(shift(subcli.input), subcli.flags)
  }
}

main(cli)
