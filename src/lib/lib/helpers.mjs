const internalRef = (s) => s.replaceAll(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase()

const sectionMark = (depth) => '#'.repeat(depth)

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
