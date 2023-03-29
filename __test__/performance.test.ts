import {test} from 'vitest'
import {readFileSync} from 'fs'
import {join} from "path";
// @ts-ignore
import {parseFiles, parseFilesSync,} from "../index";

let files: string[] = [];

try {
  files = readFileSync(join(__dirname, 'list.txt'), 'utf-8').trim().split('\n')
} catch (e) {
}

if (files.length === 0) {
  console.error('if you want to run performance test, put files list in __test__/list.txt')
  console.error('a file path per line')
} else {

  test('performance [sync]', async () => {
    const start = Date.now()
    parseFilesSync(files)
    const duration = Date.now() - start;

    console.log(
      `[sync] parse ${files.length} files, cost ${duration}ms, average ${duration / files.length}ms per file`
    )
  })

  test('performance [async]', async () => {
    const start = Date.now()
    await parseFiles(files)
    const duration = Date.now() - start;

    console.log(
      `[async] parse ${files.length} files, cost ${duration}ms, average ${duration / files.length}ms per file`
    )
  })
}

test.skip('bypass jest error', () => {
});