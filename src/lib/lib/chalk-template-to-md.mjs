const generalChalkRE = /\{([a-z]+(?:\([^)]\))?(?:\.[a-z]+(?:\([^)]*\))?)*) +((?:[^}]|\\})*)\s*\}/
const generalChalkREMultiMatch = new RegExp(generalChalkRE, 'g')

const chalkTemplateToMd = (value) => {
  const chalkTemplateMatches = value.matchAll(generalChalkREMultiMatch)

  for (const [, formatString, valueString] of chalkTemplateMatches) {
    const formattings = formatString.split('.')
    let italics = false
    let bold = false
    for (const format of formattings) {
      if (format === 'underline') { italics = true }
      else if (format === 'bold') { bold = true }
      // else, we ignore it; markdown doesn't do colors
    }
    const mdFormat = italics === true && bold === true
      ? '___'
      : italics === true
        ? '_'
        : bold === true

          ? '__'
          : ''
    // now we just replace the next one not replaced
    value = value.replace(generalChalkRE, mdFormat + valueString + mdFormat)
  }

  return value
}

export { chalkTemplateToMd }
