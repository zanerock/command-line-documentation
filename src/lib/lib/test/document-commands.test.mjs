/* global describe expect test */
import { documentCommands } from '../document-commands'

describe('documentCommands', () => {
  const commands = [
    { 
      name: 'command-b',
      subCommands: [
        { name: 'sub-a', summary: 'Subcommand A' },
        { name: 'sub-b', description: 'Subcommand B' }
      ],
      description: 'Command with sub-commands'
    },
    { 
      name: 'command-a', 
      arguments: [ { name: 'option-a', description: 'an option'}], 
      summary:'The first command.', 
      description: 'More details.'
    }
  ]
  const context = 'main-command'
  const depth = 1
  const header = 'Test'

  const expected = `## Test

<span id="main-command-command-a"></span>
### \`main-command command-a <options>\`

More details.

<span id="main-command-command-b"></span>
### \`main-command command-b\`

Command with sub-commands

### Subcommands

- [\`sub-a\`](#main-command-command-b-sub-a): Subcommand A
- [\`sub-b\`](#main-command-command-b-sub-b)

### Subcommand reference

<span id="main-command-command-b-sub-a"></span>
#### \`main-command command-b sub-a\`

Subcommand A

<span id="main-command-command-b-sub-b"></span>
#### \`main-command command-b sub-b\`

Subcommand B

`

  let content
  beforeAll(() => {
    content = documentCommands({ commands, context, depth, header })
  })

  test('documents commands and sub-commands', () => expect(content).toBe(expected))

  test('original commands order unchanged', () => expect(commands[0].name).toBe('command-b'))
})