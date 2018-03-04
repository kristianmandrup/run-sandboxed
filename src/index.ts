import {
  VM
} from 'vm2'
import * as _ from 'powerdash'
import * as fs from 'fs'

const createVm = (options: any) => {
  const ctx = {}

  const vmOpts = Object.assign({
    timeout: 1000,
    // what to make available inside
    sandbox: {
      ctx,
      _ // powerdash functions
    }
  }, options)
  return {
    vm: options.vm || new VM(vmOpts),
    ctx
  }
}

export function runSandboxedCodeAt(filePath: string, options: any = {}): any {
  const {
    warn
  } = options
  try {
    const code = fs.readFileSync(filePath, 'utf8')
    return sandboxed({
      code,
      options
    })
  } catch (err) {
    if (typeof warn === 'function') {
      warn(`runSandboxedCodeAt: Unable to read file at ${filePath}`)
      return {}
    }
    throw err
  }
}

export function sandboxed(config: any = {}) {
  let {
    code,
    options
  } = config
  const vmDef = createVm(options)
  vmDef.vm.run(code)
  return vmDef.ctx
}
