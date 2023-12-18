import { chalkTemplateToMd } from './chalk-template-to-md'
import { commandTOC } from './command-toc'
import { documentCommandArgs } from './document-command-args'
import { documentOptions } from './document-options'
import { internalRef, sectionMark } from './helpers'

const documentCommands = ({ commands, context, depth, header }) => {
  // make a copy so we don't change the order of the original input; yes, this is duplicated in 'commandTOC', but the
  // way commands are passed, there's not a unified place to do this. It's fine for now.
  commands = [...commands].sort((a, b) => a.name.localeCompare(b.name))
  let content = sectionMark(depth + 1) + ' ' + header + '\n\n'

  for (const { arguments: args, subCommands, description, name, summary } of commands) {
    content += '<span id="' + internalRef(context + ' ' + name) + '"></span>\n'
    content += sectionMark(depth + 2) + ` \`${context} ${name}` + documentCommandArgs({ allOptions : args }) + '`\n\n'
    content += description !== undefined
      ? chalkTemplateToMd(description) + '\n\n'
      : summary !== undefined
        ? chalkTemplateToMd(summary) + '\n\n'
        : ''
    if (args?.some(({ defaultOption }) => !!defaultOption)) {
      content += documentOptions({ depth : depth + 2, header : '`' + name + '` options', allOptions : args })
    }

    if (subCommands !== undefined && subCommands.length > 0) {
      const subCommandContext = context + ' ' + name
      content += commandTOC({
        commands : subCommands,
        context  : subCommandContext,
        depth    : depth + 1,
        header   : 'Subcommands'
      })
      content += documentCommands({
        commands : subCommands,
        context  : subCommandContext,
        depth    : depth + 1,
        header   : 'Subcommand reference'
      })
    }
  }
  content += '\n'

  return content
}

export { documentCommands }
