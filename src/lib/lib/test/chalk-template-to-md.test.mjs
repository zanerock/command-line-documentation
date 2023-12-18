/* global describe expect test */

import { chalkTemplateToMd } from '../chalk-template-to-md'

describe('chalkTemplateToMd', () => {
  test.each([
    ['{underline hi}', '_hi_'],
    ['{bold hi}', '__hi__'],
    ['{underline.bold hi}', '___hi___'],
    ['{red hi}', 'hi'],
    ['hello {underline you} rascal', 'hello _you_ rascal'],
    ['hello {underline you} {bold rascal}', 'hello _you_ __rascal__'],
  ])('%s -> %s', (input, expected) => expect(chalkTemplateToMd(input)).toBe(expected))
})