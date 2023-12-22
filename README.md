# command-line-documentation
[![coverage: 95%](./.readme-assets/coverage.svg)](https://github.com/liquid-labs/command-line-documentation/pulls?q=is%3Apr+is%3Aclosed)

Generates Markdown "user guide" based off CLI spec compatible with [command-line-args]() and [command-line-usage]().

___ALPHA status software__: The main documentaiton feature is working but we expect to add significant new functionality and improve ease of use before GA.

## Installation

```bash
npm i command-line-documentation
```

## Usage

### Library usage

To cerate self-documenting CLIs.

```javascript
// for ESM
import { commandLineDocumentation/*, convertCLISpecTypes */ } from 'command-line-documentation'
import commandLineArgs from 'command-line-args'
// for CJS
// const { commandLineDocumentation } = require('command-line-documentation')
// const commandLineArgs = require('command-line-args')

const mainCommand = 'do-it'
const cliSpec = {
  mainCommand,
  mainOptions: [
    { name: 'verbose', alias: 'v', type: Boolean, description: 'Makes the output chatty.'},
    { name: 'document', type: Boolean, description: `Generates Markdown documentation for '${mainCommand}'.`}
  ]
}

const options = commandLineArgs(cliSpec.mainOptions)

if (options.document === true) {
  commandLineDocumentation(cliSpec)
  process.exit(0)
}
```

### `cld` usage

To generate documentation from a YAML or JSON spec file.

```bash
npx cld path/to/cli-spec.yaml
```

## Example output

You can see this package's `cld` documentation [here](#cli-reference).

Processin the [example CLI spec](#cli-spec-data-structure) would generate:
```markdown
# `widget-maker` Command Reference

## Usage

`widget-maker <options> <command>`

## Main options

|Option|Description|
|------|------|
|`<command>`|(_main argument_,_optional_) The command to execute.|
|`--verbose`, `-v`|Makes the output a bit more chatty.|

## Commands

- [`create`](#widget-maker-create): Creates a new widget.
- [`help`](#widget-maker-help): With no command specified, prints a list of available commands or, when a command  is specified, prints help for the specified command.


<span id="widget-maker-create"></span>
### `widget-maker create [type]`

Creates a new widget.

#### `create` options

|Option|Description|
|------|------|
|`[type]`|(_main argument_,_required_) The type of the widget to create.|


#### Subcommands

- [`chart`](#widget-maker-create-chart): Creates a chart widget
- [`summary`](#widget-maker-create-summary): Creates a summary widget.

<span id="widget-maker-create-chart"></span>
##### `widget-maker create chart <options>`

Creates a chart widget

###### `chart` options

|Option|Description|
|------|------|
|`--chart-type`|The type of chart to create. May be 'bar' or 'line'.|

<span id="widget-maker-create-summary"></span>
##### `widget-maker create summary`

Creates a summary widget.

<span id="widget-maker-help"></span>
### `widget-maker help <command>`

With no command specified, prints a list of available commands or, when a command  is specified, prints help for the specified command.


#### `help` options

|Option|Description|
|------|------|
|`<command>`|(_main argument_,_optional_) The command to print help for.|
```

## User reference

### Library API

#### `commandLineDocumentation(<cliSpec>, [options])`

Generates Markdown documentation based on the [CLI spec data structure](#cli-spec-data-structure). The documentation is in a self-contained "section" whose initial header determined by the `depth` option.

__Arguments__:
- `cliSpec`: (_object_) a [CLI spec data structure](#cli-spec-data-structure).
- `options.mainCommand`: (_string_) the name of the command being documented. This will override the `mainCommand` field in the [CLI spec](#cli-spec-data-structure) (if defined).
- `options.sectionDepth`: (_integer_, default: 1) a depth of '1' (the default) makes the initial section a title ('#') heading. A depth of two would generate an H1/## heading, etc.
- `options.title`: (_string_, default: _dynamic_) specifies the primary section heading (title). If not specified, will default to "\`${mainCommand}\` Command Reference".

#### `convertCLISpecTypes(<cliSpec>)`

Converts a file-based CLI spec (which is pure YAML/JSON) to a [CLI spec data structure](#cli-spec-data-structure) by converting string types like 'Boolean' to the actual function `Boolean`. Accepts types 'Boolean', 'Number', and 'String'. Any other 'type' value will raise an exception.

__Arguments__:
- `cliSpec`: (_object_) a [CLI spec data structure](#cli-spec-data-structure) except that the 'types' are represented by strings rather than functions.

#### CLI spec data structure

```yaml
mainCommand: widget-maker
mainOptions:
  - name: command
    description: The command to execute.
    defaultOption: true
    type: String
  - name: verbose
    description: Makes the output a bit more chatty.
    alias: v
    type: Boolean
commands:
  - name: create
    summary: Creates a new widget.
    arguments:
      - name : type
        defaultOption : true
        description : The type of the widget to create.
        required: true
        # type defaults to String
    subCommands:
      - name: chart
        description: Creates a chart widget
        arguments:
          - name: chart-type
            description: The type of chart to create. May be 'bar' or 'line'.
            required: true
      - name: summary
        description: Creates a summary widget.
  - name: help
    summary: >
      With no command specified, prints a list of available commands or, when a command 
      is specified, prints help for the specified command.
    arguments:
      - name: command
        defaultOption: true
        description: The command to print help for.
```

### CLI reference

#### Usage

`cld <options> <cli-spec-path>`

#### Options

|Option|Description|
|------|------|
|`<cli-spec-path>`|(_main argument_,_optional_) The path to the [CLI spec file](https://github.com/liquid-labs/command-line-documentation##cli-spec-data-structure).|
|`--document`|(_bool_ when set, will generate own documentation and exit. The `--depth` and `--title` options work with self-documentation as well.|
|`--section-depth`|(_integer_, default: 1) a depth of '1' (the default) makes the initial section a title (H1/'#') heading. A depth of two would generate an H1/'##' heading, etc.|
|`--title`|(_string_, default: _dynamic) specifies the primary section heading (title). If not specified, will default to "`${mainCommand_` Command Reference".|

