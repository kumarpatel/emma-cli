import * as fs from 'fs'
import * as path from 'path'

export function getProjectPackageDefinition() {
   const pkg = path.resolve(process.cwd(), 'package.json')
   if (fs.existsSync(pkg)) {
      return require(pkg)
   }
   return null
}
