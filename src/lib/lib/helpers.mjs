const internalRef = (s) => s.replaceAll(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase()

const sectionMark = ({ depth, header }) => {
  if (depth <= 6) {
    return '#'.repeat(depth) + ' ' + header + '\n\n'
  }
  else {
    if (depth === 7) {
      return `___${header}___\n\n`
    }
    if (depth === 8) {
      return `__${header}__\n\n`
    }
    else { // if (depth > 8) {
      return `_${header}_\n\n`
    }
  }
}

const separateOptions = (allOptions) => {
  const defaultOptionIndex = allOptions === undefined
    ? -1
    : allOptions?.findIndex(({ defaultOption }) => defaultOption === true)

  const defaultOption = defaultOptionIndex === -1 ? undefined : allOptions[defaultOptionIndex]

  const options = [...(allOptions || [])]
  if (defaultOptionIndex !== -1) {
    options.splice(defaultOptionIndex, 1)
  }

  return { defaultOption, options }
}

export { internalRef, sectionMark, separateOptions }
