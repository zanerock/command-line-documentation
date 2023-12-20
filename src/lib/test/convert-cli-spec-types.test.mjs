/* global beforeAll describe expect test */
import * as fs from 'node:fs/promises'
import * as fsPath from 'node:path'

import yaml from 'js-yaml'

import { convertCLISpecTypes } from '../convert-cli-spec-types'

describe('convertCLISpecTypes', () => {
  let cliSpec

  beforeAll(async() => {
    const commandSpecPath = fsPath.join(__dirname, 'data', 'command-spec.yaml')
    const commandSpecContents = await fs.readFile(commandSpecPath, { encoding: 'utf8' })
    const rawCLISpec = yaml.load(commandSpecContents)

    cliSpec = convertCLISpecTypes(rawCLISpec)
  })

  test("converts 'mainOptions'", () => expect(cliSpec.mainOptions[0].type).toBe(String))

  test('converts command arguments', () => {
    expect(cliSpec.commands[2].arguments[1].type).toBe(Boolean)
    expect(cliSpec.commands[2].arguments[2].type).toBe(Boolean)
    expect(cliSpec.commands[2].arguments[3].type).toBe(Boolean)
    expect(cliSpec.commands[2].arguments[1].type).toBe(Boolean)
    expect(cliSpec.commands[4].arguments[2].type).toBe(Number)
  })

  test('Raises error on non-convertable type', () => {
    expect(() => convertCLISpecTypes({ mainOptions: [{ type: '() => 1' }]})).toThrow(/Cannot convert/)
  })
})