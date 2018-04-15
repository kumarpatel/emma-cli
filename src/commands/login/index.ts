import { h, render } from 'ink'
import EmmaLogin from './EmmaLogin'

export const options = {
  description: 'Login to Emma PKG.',
  help: `
      Usage
      $ emma login

      Options
      - no options, really simple!  
   `,
}

export async function run() {
  let unmount: any

  const onError = err => {
    unmount()
    process.exit(1)
  }

  const onExit = () => {
    unmount()
    process.exit()
  }

  unmount = render(h(EmmaLogin, { onError, onExit }))
}
