import { expect, test } from 'vitest'
import {parseCode, parseFiles} from '../index.js'
import {join} from 'path'

test('with file io error', async () => {
  try {
    await parseFiles(['/not/exists.tsx'])
    fail()
  } catch (e) {
    expect(e.message).toMatch(/Cant load file:/)
  }
})

test('parse file within bad code', async () => {
  try {
    await parseFiles([join(__dirname, 'file_has_syntax_error.ts')])
    fail()
  } catch (e) {
    console.log(e)
    expect(e.message).toMatch(/parse module script file failed:/)
  }
})

test('parse empty list', async () => {
    await parseFiles([])
})

test("parsr bad code ", () => {
  try {
    parseCode("import x 'y'")
    fail()
  } catch (e) {
    console.log(e)
  }
})
