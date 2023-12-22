/* global describe expect test */
import { documentOptions } from '../document-options'

describe('documentOptions', () => {
  test.each([
    [[], ''],
    [
      [{ name : 'foo', defaultOption : true, description : 'The default option' }],
      `## Test

|Option|Description|
|------|------|
|\`<foo>\`|(_main argument_,_optional_) The default option|

`
    ],
    [
      [{ name : 'bar', description : 'Optional option' }],
      `## Test

|Option|Description|
|------|------|
|\`--bar\`|Optional option|

`
    ],
    [
      [{ name : 'baz', alias : 'b', description : 'Aliased option' }],
      `## Test

|Option|Description|
|------|------|
|\`--baz\`, \`-b\`|Aliased option|

`
    ]
  ])('%s -> %s', (allOptions, expected) =>
    expect(documentOptions({ allOptions, depth : 1, header : 'Test' })).toBe(expected))
})
