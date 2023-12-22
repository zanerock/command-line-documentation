import { chalkTemplateToMd } from './chalk-template-to-md'
import { displayArg } from './display-arg'
import { sectionMark, separateOptions } from './helpers'

const documentOptions = ({ depth, header, allOptions }) => {
  const { defaultOption, options } = separateOptions(allOptions)
  if ((!options || options.length === 0) && defaultOption === undefined) {
    return ''
  }

  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  content += '|Option|Description|\n|------|------|\n'

  if (defaultOption !== undefined) {
    const { description, required } = defaultOption
    content += '|`' + displayArg(defaultOption)
      + `\`|(_main argument_,_${required === true ? 'required' : 'optional'}_) ` + description + '|\n'
  }

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
