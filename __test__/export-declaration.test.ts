import {parseCode, parseFiles} from '../index.js'

/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#syntax
// Aggregating modules
export * from "module-name-12";
export * as name1 from "module-name-12";
export { name1, nameN } from "module-name-12";
export { import1 as name1, import2 as name2, nameN } from "module-name-13";
export { default  } from "module-name-14";
export { default as name1 } from "module-name-15";`));
*/

const TEST_TABLE = [
  [
    'export * from "a";',
    {
      "type": "ExportAllDeclaration",
      "source": "a",
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'export * as ns from "a"',
    {
      "type": "ExportNamedDeclaration",
      "source": "a",
      "specifiers": [
        {
          "exported": "ns",
          "type": "ExportNamespaceSpecifier"
        }
      ],
      "start": 1,
      "end": 24,
      "exportKind": "value",
    }
  ],
  [
    'export {n1} from "a"',
    {
      "type": "ExportNamedDeclaration",
      "exportKind": "value",
      "source": "a",
      "specifiers": [
        {
          "exported": "n1",
          "local": "n1",
          "type": "ExportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'export {n1 as n2} from "a"',
    {
      "type": "ExportNamedDeclaration",
      "exportKind": "value",
      "source": "a",
      "specifiers": [
        {
          "exported": "n2",
          "local": "n1",
          "type": "ExportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'export { default } from "a"',
    {
      "type": "ExportNamedDeclaration",
      "exportKind": "value",
      "source": "a",
      "specifiers": [
        {
          "exported": "default",
          "local": "default",
          "type": "ExportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'export { default as n } from "a"',
    {
      "type": "ExportNamedDeclaration",
      "exportKind": "value",
      "source": "a",
      "specifiers": [
        {
          "exported": "n",
          "local": "default",
          "type": "ExportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
] as const;

test.skip('export x from "a"', () => {
  // swc auto support yet
  fail();
})

test.skip('export type * from "a"', () => {
  // swc treat it same as export * from "a"
  // so we cant ge exportKind
  fail();
})


for (let [code, expectObj] of TEST_TABLE) {
  test(code, () => {
    const json = parseCode(code);
    expect(json).toEqual([
      expectObj
    ])
  })
}
