/* global beforeEach describe expect test */
import * as fsPath from 'node:path'

import { cld } from '../cld'

describe('cld', () => {
  let output, errout
  const stdout = {
    write : (chunk) => { output += chunk }
  }
  const stderr = {
    write : (chunk) => { errout += chunk }
  }

  beforeEach(() => {
    output = ''
    errout = ''
  })

  test('prints documentation to stdout given valid file path', async() => {
    const testDataPath = fsPath.resolve(__dirname, '..', '..', 'lib', 'test', 'data', 'command-spec.yaml')
    const argv = [testDataPath]

    const exitCode = await cld({ argv, stderr, stdout })

    expect(exitCode).toBe(0)
    expect(errout).toBe('')
    expect(output.startsWith('# `foo` Command Reference')).toBe(true)
  })

  test('exits with code 1 if CLI spec path not provided', async() => {
    const argv = []
    const exitCode = await cld({ argv, stderr, stdout })
    expect(exitCode).toBe(1)
    expect(output).toBe('')
    expect(errout.startsWith('Missing required')).toBe(true)
  })

  test('exists with code 2 if CLI spec path points to nothing', async() => {
    const badPath = fsPath.join(__dirname, 'ThisIsNotAValidFile.yaml')
    const argv = [badPath]

    const exitCode = await cld({ argv, stderr, stdout })
    expect(exitCode).toBe(2)
    expect(output).toBe('')
    expect(errout.startsWith('No such file')).toBe(true)
  })

  test('exists with code 3 if CLI spec yaml is invalid', async() => {
    const badYAMLPath = fsPath.join(__dirname, 'data', 'bad-yaml.yaml')
    const argv = [badYAMLPath]

    const exitCode = await cld({ argv, stderr, stdout })
    expect(exitCode).toBe(3)
    expect(output).toBe('')
    expect(errout.startsWith('Cannot parse')).toBe(true)
  })

  test('exists with code 4 if CLI spec contains invalid type', async() => {
    const badTypePath = fsPath.join(__dirname, 'data', 'bad-type.yaml')
    const argv = [badTypePath]

    const exitCode = await cld({ argv, stderr, stdout })
    expect(exitCode).toBe(4)
    expect(output).toBe('')
    expect(errout.startsWith('Invalid CLI spec')).toBe(true)
  })
})
