const commandLineDocumentation = ({
    cliSpec = throw new Error("Missing required parameter 'cliSpec'."),
    mainCommand = throw new Error("Missing required parameter 'mainCommand'."),
    output,
    sectionDepth = 1, 
    title = `${mainCommand} Command Reference`
  }) => {
  let content = ''
  const depth = sectionDepth
  const { mainOptions, commands } = cliSpec

  content = sectionMark(depth) + ' ' + title + '\n\n' //  section/page title

  content += documentUsage({ depth, mainCommand, mainOptions })

  if (commands !== undefined) {
    content += commandTOC({ commands, context: mainCommand, depth, header: 'Commands' })
  }

  const mainOptionsHeader = commands === undefined ? 'Options' : 'Main options'
  content += documentOptions({ depth, header: mainOptionsHeader, allOptions: mainOptions })

  return content
}

const commandTOC = ({ commands, context, depth, header }) => {
  commands.sort((a, b) => a.name.localeCompare(b.name))

  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  for (const { name, summary } of commands) {
    `- [${name}](#${internalRef(context + ' ' + name)}): ${summary}\n`
  }

  content += '\n'

  return content
}

const documentOptions = ({ depth, header, allOptions }) => {
  const { options } = separateOptions(allOptions)

  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  content += '|Option|Description|\n'
  for (const { alias, name, description } of options) {
    content += '|' + name
    if (alias !== undefined) {
      content += ', ' + alias
    }
    content += '|' + description + '|\n'
  }

  content += '\n'

  return content
}

const documentUsage = ({ depth, mainCommand, mainOptions }) => {
  let usage = sectionMark(depth + 1) + ' Usage\n\n'

  usage += '`' + mainCommand

  const { defaultOption, options } = separateOptions(mainOptions)
  if (options.length > 0) {
    usage += ' <options>'
  }
  if (defaultOption !== undefined) {
    const { required, name } = defaultOption
    usage += ' ' + (required === true ? '[' : '<') + name + (required === true ? ']' : '>')
  }
  usage += '`\n\n'

  return usage
}

const internalRef = (s) => s.replaceAll(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase()

const sectionMark = (depth) =>  '#'.repeat(depth)

const separateOptions = (allOptions) => {
  const defaultOptionIndex = allOptions.findIndex(({ defaultOption }) => defaultOption === true)

  const defaultOption = defaultOptionIndex === -1 ? undefined : allOptions[defaultOptionIndex]

  const options = [...allOptions]
  if (defaultOptionIndex !== -1) {
    options.splice(defaultOptionIndex, 1)
  }

  console.log()

  return { defaultOption, options }
}

export { commandLineDocumentation }