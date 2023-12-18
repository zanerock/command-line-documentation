import { documentCommandArgs } from './document-command-args'
import { sectionMark } from './helpers'

const documentUsage = ({ depth, mainCommand, mainOptions }) => {
  let usage = sectionMark(depth + 1) + ' Usage\n\n'

  usage += '`' + mainCommand

  usage += documentCommandArgs({ allOptions : mainOptions }) + '`\n\n'

  return usage
}

export { documentUsage }
