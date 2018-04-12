import * as fs from 'fs'
import * as execa from 'execa'

export interface Playlist {}

export interface Package {
  name: string
  version: string
  dev: boolean
}

type FlattenedPackage = string

type Environment = 'npm' | 'yarn'

interface Command {
  manager: string
  addDependency: string[]
  addDevDependency: string[]
}

type Commands = { [E in Environment]: Command }

// Package Managers

const packageManagers: Commands = {
  yarn: {
    manager: 'yarnpkg',
    addDependency: ['add'],
    addDevDependency: ['add', '-D'],
  },
  npm: {
    manager: 'npm',
    addDependency: ['install', '--save'],
    addDevDependency: ['install', '--save-dev'],
  },
}

// Environment

const canUseYarn = async (): Promise<boolean> => {
  try {
    await execa.sync(`yarnpkg --version`, { stdio: `ignore` })
    return true
  } catch (err) {
    return false
  }
}

const getEnvironment = async (): Promise<Environment> => {
  const npm = fs.existsSync('package-lock.json')
  const yarn = await canUseYarn()

  if (yarn && !npm) {
    return 'yarn'
  }
  return 'npm'
}

const installPackages = async (
  manager: string,
  command: string[],
  packages: FlattenedPackage[],
) => {
  try {
    execa.sync(manager, [...command, ...packages], { stdin: `inherit` })
  } catch (err) {
    throw err
  }
}

// Install

const parsePackage = (pkg: Package): string =>
  pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name

const isDependency = (pkg: Package): boolean => !pkg.dev
const isDevDependency = (pkg: Package): boolean => pkg.dev

const notEmpty = (a: any) => a.length > 0

export const install = async (packages: Package[]): Promise<void> => {
  const env = await getEnvironment()
  const cmds = packageManagers[env]

  // Packages
  const dependencies = packages.filter(isDependency).map(parsePackage)
  const devDependencies = packages.filter(isDevDependency).map(parsePackage)

  // Install the queries
  if (notEmpty(dependencies)) {
    await installPackages(cmds.manager, cmds.addDependency, dependencies)
  }

  if (notEmpty(devDependencies)) {
    await installPackages(cmds.manager, cmds.addDevDependency, devDependencies)
  }

  return
}
