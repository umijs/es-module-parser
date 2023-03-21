/// reference: jest
import {parseCode, parseFiles} from '../index.js'

/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#syntax
import defaultExport from "module-name-1";
import * as name from "module-name-2";
import { export1 } from "module-name-3";
import { export1 as alias1 } from "module-name-4";
import { default as alias } from "module-name-5";
import { export1, export2 } from "module-name-6 ";
import { export1, export2 as alias2,} from "module-name-7";
import { "string name" as alias } from "module-name-8";
import defaultExport, { export1 } from "module-name-9";
import defaultExport, * as name from "module-name-10";
import "module-name-11";

*/

const TEST_TABLE = [
  [
    'import d from "a";',
    {
      "type": "ImportDeclaration",
      "source": "a",
      "specifiers": [
        {
          "local": "d",
          "type": "ImportDefaultSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
      "import_kind": "value",
    }
  ],
  [
    'import * as name from "a";',
    {
      "type": "ImportDeclaration",
      "source": "a",
      "specifiers": [
        {
          "local": "name",
          "type": "ImportNamespaceSpecifier"
        }
      ],
      "import_kind": "value",
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    `import { e } from "a";`,
    {
      "type": "ImportDeclaration",
      "import_kind": "value",
      "source": "a",
      "specifiers": [
        {
          "imported": "e",
          "local": "e",
          "type": "ImportSpecifier"
        }
      ],
      "end": expect.any(Number),
      "start": expect.any(Number),
    }
  ],
  [
    `import { e as f} from "a";`,
    {
      "type": "ImportDeclaration",
      "import_kind": "value",
      "source": "a",
      "specifiers": [
        {
          "imported": "e",
          "local": "f",
          "type": "ImportSpecifier"
        }
      ],
      "end": expect.any(Number),
      "start": expect.any(Number),
    }
  ],
  [
    `import { default as f} from "a";`,
    {
      "type": "ImportDeclaration",
      "import_kind": "value",
      "source": "a",
      "specifiers": [
        {
          "imported": "default",
          "local": "f",
          "type": "ImportSpecifier"
        }
      ],
      "end": expect.any(Number),
      "start": expect.any(Number),
    }
  ],
  [
    `import { "spaced name" as alias } from "a";`,
    {
      "type": "ImportDeclaration",
      "import_kind": "value",
      "source": "a",
      "specifiers": [
        {
          "imported": "spaced name",
          "local": "alias",
          "type": "ImportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],

  [`import d, { n } from "a";`,
    {
      "type": "ImportDeclaration",
      "import_kind": "value",
      "source": "a",
      "specifiers": [
        {
          "local": "d",
          "type": "ImportDefaultSpecifier"
        },
        {
          "imported": "n",
          "local": "n",
          "type": "ImportSpecifier"
        }
      ],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
  ],
  [
    `import d, * as ns from "a";`,
    {
      "type": "ImportDeclaration",
      "source": "a",
      "specifiers": [
        {
          "local": "d",
          "type": "ImportDefaultSpecifier"
        },
        {
          "local": "ns",
          "type": "ImportNamespaceSpecifier"
        }
      ],
      "import_kind": "value",
      "start": 1,
      "end": 28,
    }
  ],

  [
    'import "a";',
    {
      "type": "ImportDeclaration",
      "source": "a",
      "import_kind": "value",
      "specifiers": [],
      "start": expect.any(Number),
      "end": expect.any(Number),
    }
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