import fs from 'fs'
import execa from 'execa'

// Package Managers

const packageManagers = {
  yarn: {
    name: 'yarnpkg',
    addDependency: ['add'],
    addDevDependency: ['add', '-D'],
  },
  npm: {
    name: 'npm',
    addDependency: ['install', '--save'],
    addDevDependency: ['install', '--save-dev'],
  },
}

// Environment

const canUseYarn = async () => {
  try {
    await execa.sync(`yarnpkg --version`, { stdio: `ignore` })
    return true
  } catch (err) {
    return false
  }
}

const getEnvironment = async () => {
  const npm = fs.existsSync('package-lock.json')
  const yarn = await canUseYarn()

  if (yarn && !npm) {
    return 'yarn'
  }
  return 'npm'
}

const installPackages = async (env, commands, packages) => {
  try {
    execa.sync(env, [...commands, ...packages], { stdin: `inherit ` })
  } catch (err) {
    throw err
  }
}

// Install

const parsePackage = pkg =>
  pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name

const isDependency = pkg => !pkg.dev
const isDevDependency = pkg => pkg.dev

const notEmpty = a => a.length > 0

export const install = async packages => {
  const env = await getEnvironment()
  const cmds = packageManagers[env]

  // Packages
  const dependencies = packages.filter(isDependency).map(parsePackage)
  const devDependencies = packages.filter(isDevDependency).map(parsePackage)

  // Install the queries
  if (notEmpty(dependencies)) {
    await installPackages(cmds.name, cmds.addDependency, dependencies)
  }

  if (notEmpty(devDependencies)) {
    await installPackages(cmds.name, cmds.addDevDependency, devDependencies)
  }

  return true
}
