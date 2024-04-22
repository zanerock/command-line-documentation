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
      description : '({underline bool}) When set, will generate own documentation and exit. The `--depth` and `--title` options work with self-documentation as well.',
      type        : Boolean
    },
    {
      name : 'multi-page',
      descirption: '({undeline bool}) When set, will generate a multi-page document with one command (sub-command) per page.',
      type: Boolean
    },
    {
      name: 'output',
      description: "({underline string}) The file or directory to send output to. This will overwrite any existing file(s), but will not clear a directory. If `--multiple` is set, then `--output` must be specified and must be a  directory if it exists. The directory will be created if it does not exist. If `--multilpe` is not set, then the output value is treated as a file which will be created if it doesn't exist. A value of '-' indicates to output to `stdin` and is the same as leaving `--output` unset.
    },
    {
      name        : 'section-depth',
      description : "({underline integer}, default: 1) A depth of '1' (the default) makes the initial section a title (H1/'#') heading. A depth of two would generate an H2/'##' heading, etc.",
      type        : Number
    },
    {
      name        : 'title',
      // eslint-disable-next-line no-template-curly-in-string
      description : '({underline string}, default: {underline dynamic}) Specifies the primary section heading (title). If not specified, will default to "`${mainCommand}` Command Reference".'
    }
  ]
}

const cld = async({ argv = process.argv, stderr = process.stderr, stdout = process.stdout } = {}) => {
  const options = commandLineArgs(myCLISpec.mainOptions, { argv })
  const filePath = options['cli-spec-path']
  const { document: doDocument, 'multi-page': multiPage, output, 'section-depth': sectionDepth, title } = options

  if (filePath !== undefined && doDocument === true) {
    stderr.write("Option '--document' incompatible with CLI spec path.")
    return 5
  }
  else if (filePath === undefined && doDocument !== true) {
    stderr.write("Missing required CLI spec path (from argv), or invoke with '--document' option.\n")
    return 1
  }

  if (multiPage === true && output === undefined) {
    stderr.write("'--output' must be specified when '--multi-page' is set.\n")
    return 1
  }
  else if (multiPage === true && output = '_') {
    stderr.write("'--output' cannot be set to '-' (`stdin`) when `--multi-page` is set.\n")
  }
  // TODO: if multiPage === true, verify that output is a directory if it exists


  let cliSpec

  if (doDocument === true) {
    cliSpec = myCLISpec
  }
  else {
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
  }

  const docs = commandLineDocumentation(cliSpec, { multiPage, output, sectionDepth, title })

  stdout.write(doc)
  return 0
}

export { cld }
