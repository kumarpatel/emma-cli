#!/usr/bin/env node

import * as meow from 'meow'
import * as updateNotifier from 'update-notifier'

import { commands } from './commands'

// Helpers

const shift = ([_, ...xs]) => xs
const first = ([x, ..._]) => x

// CLI

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
  },
)

updateNotifier({ pkg: cli.pkg }).notify()

// Commands

async function main(cli: meow.Result): Promise<void> {
  const { input, flags } = cli

  // Defaults

  if (input.length === 0) {
    if (flags.help) {
      await cli.showHelp()
    } else {
      await commands.search.run(shift(input), flags)
    }
    process.exit()
  }

  const command = commands[first(input)]

  if (!command) {
    await cli.showHelp()
  } else {
    const subcli = meow(command.options)
    await command.run(shift(subcli.input), subcli.flags)
  }

  process.exit()
}

main(cli)
