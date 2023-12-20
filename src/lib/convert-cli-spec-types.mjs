const convertCLISpecTypes = (cliSpec) => {
  const newCLISpec = structuredClone(cliSpec)

  newCLISpec.mainOptions?.forEach((optionSpec) => convertTypes(optionSpec))
  convertCommandArguments(newCLISpec.commands)

  return newCLISpec
}

const convertCommandArguments = (commandsSpec = []) => {
  for (const { arguments: args } of Object.values(commandsSpec)) {
    if (args !== undefined) {
      args.forEach((argSpec) => convertTypes(argSpec))
    }
  }
}

const convertTypes = (optionSpec = {}) => {
  const { type } = optionSpec
  if (type === undefined) {
    return
  }

  if (type === 'Boolean') {
    optionSpec.type = Boolean
  }
  else if (type === 'String') {
    optionSpec.type = String
  }
  else if (type === 'Number') {
    optionSpec.type = Number
  }
  else {
    throw new Error(`Cannot convert non-standard type function: ${type}.`)
  }
}

export { convertCLISpecTypes }
