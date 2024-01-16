import { documentCommandArgs } from './document-command-args'
import { sectionMark } from './helpers'

const documentUsage = ({ depth, mainCommand, mainOptions }) => {
  let usage = sectionMark({ depth: depth + 1, header: 'Usage' })

  usage += '`' + mainCommand

  usage += documentCommandArgs({ allOptions : mainOptions }) + '`\n\n'

  return usage
}

export { documentUsage }
