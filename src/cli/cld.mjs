import * as fs from 'node:fs/promises'

import yaml from 'js-yaml'

import { commandLineDocumentation } from '../lib/command-line-documentation'
import { convertCLISpecTypes } from '../lib/convert-cli-spec-types'

const cld = async ({ argv = process.argv, stderr = process.stderr, stdout = process.stdout } = {}) => {
  const filePath = argv[2]

  if (filePath === undefined) {
    stderr.write('Missing required CLI spec path (from argv).\n')
    return 1
  }

  let fileContents
  try {
    fileContents = await fs.readFile(filePath, { encoding: 'utf8' })
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
