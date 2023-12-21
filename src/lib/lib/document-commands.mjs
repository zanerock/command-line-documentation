import { chalkTemplateToMd } from './chalk-template-to-md'
import { commandTOC } from './command-toc'
import { documentCommandArgs } from './document-command-args'
import { documentOptions } from './document-options'
import { internalRef, sectionMark } from './helpers'

const documentCommands = ({ commands, context, depth, header, noNewline = false }) => {
  // make a copy so we don't change the order of the original input; yes, this is duplicated in 'commandTOC', but the
  // way commands are passed, there's not a unified place to do this. It's fine for now.
  commands = [...commands].sort((a, b) => a.name.localeCompare(b.name))
  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  content += commandTOC({ commands, context : mainCommand })

  commands.forEach(({ arguments: args, subCommands, description, name, summary }, i, arr) => {
    content += '<span id="' + internalRef(context + ' ' + name) + '"></span>\n'
    content += sectionMark(depth + 2) + ` \`${context} ${name}` + documentCommandArgs({ allOptions : args }) + '`\n\n'
    content += description !== undefined
      ? chalkTemplateToMd(description) + '\n'
      : summary !== undefined
        ? chalkTemplateToMd(summary) + '\n'
        : ''
    if (i + 1 < arr.length) {
      content += '\n'
    }

    if (args?.some(({ defaultOption }) => !!defaultOption)) {
      content += documentOptions({ depth : depth + 2, header : '`' + name + '` options', allOptions : args })
    }

    if (subCommands !== undefined && subCommands.length > 0) {
      content += '\n'
      const subCommandContext = context + ' ' + name
      content += commandTOC({
        commands : subCommands,
        context  : subCommandContext,
        depth    : depth + 1,
        header   : 'Subcommands'
      }) + '\n'
      content += documentCommands({
        commands : subCommands,
        context  : subCommandContext,
        depth    : depth + 1,
        header   : 'Subcommand reference',
        noNewline : true
      })
    }
  })
  if (noNewline !== true) {
    content += '\n'
  }

  return content
}

export { documentCommands }
