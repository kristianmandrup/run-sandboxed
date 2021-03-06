import {
  VM
} from 'vm2'
import * as _ from 'powerdash'
import * as fs from 'fs'
import * as deepmerge from 'deepmerge'

function error(msg: string, data?: any) {
  data ? console.error(msg, data) : console.error(msg)
  throw new Error(msg)
}
const defaults = {
  error,
  log() { }
};

const createVm = (options: any) => {
  let {
    log
  } = options
  log = log || defaults.log

  const vmOpts = deepmerge({
    timeout: 1000,
    // what to make available inside
    sandbox: {
      _ // powerdash functions
    }
  }, options)
  log({
    vmOpts
  })
  return {
    vm: options.vm || new VM(vmOpts)
  }
}

export function runSandboxedCodeAt(filePath: string, options: any = {}): any {
  const {
    warn,
    defaultValue
  } = options
  try {
    const code = fs.readFileSync(filePath, 'utf8')
    return sandboxedCtx({
      code,
      options
    })
  } catch (err) {
    if (typeof warn === 'function') {
      warn(`runSandboxedCodeAt: Unable to read file at ${filePath}`)
      return defaultValue || {}
    }
    throw err
  }
}

export function sandboxed(config: any = {}) {
  let {
    code,
    options = {},
  } = config
  let {
    log,
    error
  } = options
  error = error || defaults.error
  log = log || defaults.log

  const vmDef = createVm(options)
  if (!code) {
    error('missing code to be run in sandbox', {
      code
    })
  }

  try {
    // var script = new VMScript("Math.random()").compile();
    const result = vmDef.vm.run(code)
    log({ result, code })
    return result
  } catch (err) {
    error('Failed to run script', err);
  }
}

export function sandboxedCtx(config: any = {}) {
  return sandboxed(config)
}
