#!/usr/bin/env node

import meow from 'meow'
import updateNotifier from 'update-notifier'

import { commands } from './commands'

// CLI

const cli = meow(`
   Usage
     $ emma

   Example
     $ emma

   Options
     - no options, really simple!

   Run without package-name to enter live search.
   Use keyboard to search through package library.
   Use up/down to select packages.
   Click enter to trigger the install.   
`)

updateNotifier({ pkg: cli.pkg }).notify()

