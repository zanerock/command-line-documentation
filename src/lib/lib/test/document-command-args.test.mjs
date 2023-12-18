/* global describe expect test */
import { documentCommandArgs } from '../document-command-args'

describe('documentCommandArgs', () => {
  test.each([
    [[ { defaultOption: true, required: true, name: 'foo'}], ' [foo]'],
    [[ { defaultOption: true, name: 'foo'}], ' <foo>'],
    [[ { defaultOption: true, name: 'foo'}, { name: 'another' }], ' <options> <foo>'],
    [[], ''],
    [undefined, '']
  ])('%p -> %s', (allOptions, expected) => expect(documentCommandArgs({ allOptions })).toBe(expected))
})