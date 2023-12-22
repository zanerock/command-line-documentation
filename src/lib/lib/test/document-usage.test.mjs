/* global describe expect test */
import { documentUsage } from '../document-usage'

describe('documentUsage', () => {
  test.each([
    [undefined, '`command`'],
    [[{ name : 'option-a', description : 'An option.' }], '`command <options>`'],
    [
      [
        { name : 'option-a', description : 'An option.' },
        { name : 'action', defaultOption : true, required : true, description : 'The action.' }
      ],
      '`command <options> [action]`'
    ]
  ])('%p -> %s', (mainOptions, expected) => {
    expected = `## Usage\n\n${expected}\n\n`
    expect(documentUsage({ depth : 1, mainCommand : 'command', mainOptions })).toBe(expected)
  })
})
