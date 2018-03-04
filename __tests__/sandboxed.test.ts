import * as path from 'path'
import {
  runSandboxedCodeAt
} from '../src'

describe('transformTree', () => {
  it('transforms treeDef to an object', () => {
    const filePath = path.join(__dirname, 'treedef.sjs')
    const ctx = runSandboxedCodeAt(filePath)
    expect(typeof ctx.treeDef).toBe('object')
    expect(ctx.treeDef.opts.type).toBe('js')
  })
})

