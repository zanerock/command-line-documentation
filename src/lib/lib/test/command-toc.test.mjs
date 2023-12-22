/* global beforeAll describe expect test */
import { commandTOC } from '../command-toc'

describe('commandTOC', () => {
  const header = 'Test'
  const depth = 2
  const context = 'foo'
  const commands = [{ name : 'last', summary : 'The last command.' }, { name : 'first', summary : 'the first command' }]
  const expected = `### Test

- [\`first\`](#foo-first): the first command
- [\`last\`](#foo-last): The last command.

`
  let content
  beforeAll(() => {
    content = commandTOC({ commands, context, depth, header })
  })

  test('sorted output', () => expect(content).toBe(expected))
  test('original commands remain unsorted', () => expect(commands[0].name).toBe('last'))
})
