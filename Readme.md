# Run sandboxed

 Run sandboxed code and return result in `ctx` object. By default only [powerdash](https://www.npmjs.com/package/powerdash) functions are made available inside the sandbox via `_`.

## Usage

Create a sandbox file such as `simple.sjs`

```js
result = 42
```

To return an object, pass into variable `result`

```js
result = {
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

Pass a custom `warn` function to signal a warning and return a default value if code can not be read (or run). If a `warn` function is not passed, the error is handled normally and an Error might well be thrown.

### defaultValue

Custom default value to return in case of error. If not set, will return empty object `{}`.

### log

Pass a custom `log` function to log messages

### error

Pass a custom `error` function to handle (and throw) errors

### VM sandbox options

You can pass custom VM sandbox options to override the defaults:

```js
{
  timeout: 1000,
  // what to make available inside
  sandbox: {
    _ // powerdash functions
  }
}
```

## Dependencies

Uses [vm2](https://www.npmjs.com/package/vm2) to run a secured VM sandbox.

## License

MIT
