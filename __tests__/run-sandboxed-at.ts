import * as path from 'path'
import {
  runSandboxedCodeAt
} from '../src'

describe('Run sandboxed code in file', () => {
  it('returns a simple object', () => {
    const filePath = path.join(__dirname, 'simple.sjs')
    const result = runSandboxedCodeAt(filePath, {
      log: console.log,
    })
    console.log({ result })
    expect(typeof result).toBe('number')
    expect(result).toEqual(42)
  })

  it('returns a treeDef as an object', () => {
    const filePath = path.join(__dirname, 'treedef.sjs')
    const result = runSandboxedCodeAt(filePath, {
      log: console.log,
    })
    expect(typeof result).toBe('object')
    expect(result.opts.type).toBe('js')
  })

  it('works when passing options', () => {
    const filePath = path.join(__dirname, 'treedef.sjs')
    const result = runSandboxedCodeAt(filePath, {
      log: console.log,
      sandbox: {
        x: 32
      }
    })
    expect(typeof result).toBe('object')
    expect(result.opts.type).toBe('js')
  })

  it('works when using powerdash in template', () => {
    const filePath = path.join(__dirname, 'use-powerdash.sjs')
    const result = runSandboxedCodeAt(filePath, {
      log: console.log,
      sandbox: {
        x: 32
      }
    })
    expect(typeof result).toBe('object')
    expect(result.opts.name).toBe('Adam snow')
  })
})

