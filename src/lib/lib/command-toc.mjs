import { internalRef, sectionMark } from './helpers'

const commandTOC = ({ commands, context, depth, header }) => {
  // make a copy so we don't change the order of the original input
  commands = [...commands].sort((a, b) => a.name.localeCompare(b.name))
  let content = header === undefined ? '' : sectionMark(depth + 1) + ' ' + header + '\n\n'

  for (const { name, summary } of commands) {
    content += `- [\`${name}\`](#${internalRef(context + ' ' + name)})`
    if (summary !== undefined) {
      content += `: ${summary}\n`
    }
  }

  content += '\n'

  return content
}

export { commandTOC }
