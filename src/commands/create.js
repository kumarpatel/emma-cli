import { getProjectPackageDefinition } from '../lib/package'

export const options = {

}

export async function run() {
   const pkg = getProjectPackageDefinition()
   console.log(pkg)
}
