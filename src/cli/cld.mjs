import * as fs from 'node:fs/promises'

import commandLineArgs from 'command-line-args'
import yaml from 'js-yaml'

import { commandLineDocumentation } from '../lib/command-line-documentation'
import { convertCLISpecTypes } from '../lib/convert-cli-spec-types'

const myCLISpec = {
  mainCommand : 'cld',
  mainOptions : [
    {
      name          : 'cli-spec-path',
      description   : 'The path to the [CLI spec file](https://github.com/liquid-labs/command-line-documentation##cli-spec-data-structure).',
      defaultOption : true
    },
    {
      name        : 'document',
      description : '({underline bool} when set, will generate own documentation and exit. The `--depth` and `--title` options work with self-documentation as well.',
      type        : Boolean
    },
    {
      name        : 'section-depth',
      description : "({underline integer}, default: 1) a depth of '1' (the default) makes the initial section a title (H1/'#') heading. A depth of two would generate an H1/'##' heading, etc.",
      type        : Number
    },
    {
      name        : 'title',
      // eslint-disable-next-line no-template-curly-in-string
      description : '({underline string}, default: {underline dynamic}) specifies the primary section heading (title). If not specified, will default to "`${mainCommand}` Command Reference".'
    }
  ]
}

const cld = async({ argv = process.argv, stderr = process.stderr, stdout = process.stdout } = {}) => {
  const options = commandLineArgs(myCLISpec.mainOptions, { argv })
  const filePath = options['cli-spec-path']
  const { document: doDocument, title } = options
  const sectionDepth = options['section-depth']

  if (filePath !== undefined && doDocument === true) {
    stderr.write("Option '--document' incompatible with CLI spec path.")
    return 5
  }
  else if (filePath === undefined && doDocument !== true) {
    stderr.write("Missing required CLI spec path (from argv), or invoke with '--document' option.\n")
    return 1
  }
  else if (doDocument === true) {
    const content = await commandLineDocumentation(myCLISpec, { sectionDepth, title })
    process.stdout.write(content)
    return 0
  }

  let fileContents
  try {
    fileContents = await fs.readFile(filePath, { encoding : 'utf8' })
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      stderr.write(`No such file '${filePath}'.\n`)
      return 2
    }
    stderr.write(e.message + '\n')
    return 10
  }

  let rawCLISpec
  try {
    rawCLISpec = yaml.load(fileContents)
  }
  catch (e) {
    stderr.write(`Cannot parse '${filePath}' as YAML file; ${e.message}\n`)
    return 3
  }

  let cliSpec
  try {
    cliSpec = convertCLISpecTypes(rawCLISpec)
  }
  catch (e) {
    stderr.write('Invalid CLI spec; ' + e.message + '\n')
    return 4
  }

  const doc = commandLineDocumentation(cliSpec)

  stdout.write(doc)
  return 0
}

export { cld }
