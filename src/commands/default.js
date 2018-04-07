import { render, h, Component } from 'ink'

// Emma

class Emma extends Component {
   render() {
      return (
         <div>Works</div>
      )
   }
}

// Command

export function setFlags(meow) {
   console.log(meow)
}

export async function run() {
   let unmount // eslint-disable-line prefer-const

   const onError = () => {
      unmount()
      process.exit(1)
   }

   const onExit = () => {
      unmount()
      process.exit()
   }

   // Uses `h` instead of JSX to avoid transpiling this file
   unmount = render(h(Emma, { onError, onExit }))
}
