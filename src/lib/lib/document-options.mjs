import { chalkTemplateToMd } from './chalk-template-to-md'
import { sectionMark, separateOptions } from './helpers'

const documentOptions = ({ depth, header, allOptions }) => {
  const { options } = separateOptions(allOptions)
  if (!options || options.length === 0) {
    return ''
  }

  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  content += '|Option|Description|\n|------|------|\n'
  for (const { alias, name, description } of options) {
    content += '|`--' + name + '`'
    if (alias !== undefined) {
      content += ', `-' + alias + '`'
    }
    content += '|' + chalkTemplateToMd(description) + '|\n'
  }

  content += '\n'

  return content
}

export { documentOptions }
