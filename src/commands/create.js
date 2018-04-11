import { getProjectPackageDefinition } from '../lib/package'

// Command

export const options = {
  description: 'Create a Playlist of packages.',
  help: `
      Usage
      $ emma create

      Options
      - no options, really simple!  
   `,
}

export async function run() {
  const pkg = getProjectPackageDefinition()
  console.log(pkg)
}
