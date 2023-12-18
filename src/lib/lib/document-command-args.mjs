import { separateOptions } from './helpers'

const documentCommandArgs = ({ allOptions }) => {
  let content = ''
  if (allOptions === undefined || allOptions.length === 0) {
    return content
  }

  const { defaultOption, options } = separateOptions(allOptions)
  if (options.length > 0) {
    content += ' <options>'
  }
  if (defaultOption !== undefined) {
    const { required, name } = defaultOption
    content += ' ' + (required === true ? '[' : '<') + name + (required === true ? ']' : '>')
  }

  return content
}

export { documentCommandArgs }
