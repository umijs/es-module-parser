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
    'const x = import("mfsu")',
    {
      "source": "mfsu",
      "type": "DynamicImport",
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'const x = import("mfsu",{type: "function"})',
    {
      "source": "mfsu",
      "type": "DynamicImport",
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    'const x = import("a"+"b")',
    // ignore non-string literal import
  ]
] as const;


for (let [code, expectObj] of TEST_TABLE) {
  test(code, () => {
    const json = parseCode(code);
    expect(json).toEqual([
      expectObj
    ])
  })
}
