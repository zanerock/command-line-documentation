import * as fs from 'node:fs/promises'

import yaml from 'js-yaml'

import { commandLineDocumentation } from '../lib/command-line-documentation'
import { convertCLISpecTypes } from '../lib/convert-cli-spec-types'

const cld = async ({ argv = process.argv, stdout = process.stdout } = {}) => {
  const filePath = argv[2]

  if (filePath === undefined) {
    process.stderr.write('Missing required CLI spec path.\n')
  }

  let fileContents
  try {
    fileContents = await fs.readFile(filePath, { encoding: 'utf8' })
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      process.stderr.write(`No such file '${filePath}'.\n`)
      process.exit(1)
    }
    process.stderr.write(e.message + '\n')
    process.exit(10)
  }

  let rawCLISpec
  try {
    rawCLISpec = yaml.load(fileContents)
  }
  catch (e) {
    process.stderr.write(`Cannot parse '${filePath}' as YAML file; ${e.message}\n`)
    process.exit(2)
  }

  let cliSpec
  try {
    cliSpec = convertCLISpecTypes(rawCLISpec)
  }
  catch (e) {
    process.stderr.write('Invalid CLI spec; ' + e.message + '\n')
    process.exit(4)
  }

  const doc = commandLineDocumentation({ cliSpec })

  stdout.write(doc)
}

export { cld }
