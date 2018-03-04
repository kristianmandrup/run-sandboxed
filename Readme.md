# Run sandboxed

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/run-sandboxed.svg)](https://greenkeeper.io/)

 Run sandboxed code and return result in `ctx` object. By default only [powerdash](https://www.npmjs.com/package/powerdash) functions are made available inside the sandbox via `_`.

## Usage

Create a sandbox file such as `treedef.sjs`

```js
ctx.treeDef = {
  opts: {
    type: 'js',
    indent: 4
  }
}
```

Then run the file in a sandbox via `runSandboxedCodeAt(filePath)` and collect the result

```js
const filePath = path.join(__dirname, 'treedef.sjs')
const ctx = runSandboxedCodeAt(filePath)
// { treeDef: { opts: { type: 'js' }}}
```

## Options

### warn

Pass a `warn` function as an option to signal a warning and return an empty object `{}` if code can not be read (or run). If a `warn` function is not passed, the error is simply thrown.

### VM sandbox options

You can pass custom VM sandbox options to override the defaults:

```js
{
  timeout: 1000,
  // what to make available inside
  sandbox: {
    ctx,
    _ // powerdash functions
  }
}
```

## Dependencies

Uses [vm2](https://www.npmjs.com/package/vm2) to run a secured VM sandbox.

## License

MIT