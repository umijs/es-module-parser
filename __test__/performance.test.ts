/// reference: jest

import {readFileSync} from 'fs'
import {join} from "path";
import {parseFiles, parseFilesJsonStr} from "../index";

let files: string[] = [];

try {
  files = readFileSync(join(__dirname, 'list.txt'), 'utf-8').trim().split('\n');
} catch (e) {
}


if (files.length === 0) {
  console.error('if you want to run performance test, put files list in __test__/list.txt')
  console.error('a file path per line')
} else {

  test('performance [JSON]', async () => {
    const start = Date.now()
    await parseFilesJsonStr(files)
    const duration = Date.now() - start;

    console.log(
      `[JSON] parse ${files.length} files, cost ${duration}ms, average ${duration / files.length}ms per file`
    )
  })

  test('performance [Object]', async () => {
    const start = Date.now()
    await parseFiles(files)
    const duration = Date.now() - start;

    console.log(
      `[Object] parse ${files.length} files, cost ${duration}ms, average ${duration / files.length}ms per file`
    )
  })
}

it.skip('bypass jest error', () => {
});