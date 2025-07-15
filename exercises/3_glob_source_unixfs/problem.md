## UnixFS: merkleising files and directories using glob source

Now let's explore how to add entire directory structures to IPFS using the `globSource` helper (only for Node.js).

While the previous exercise created the UnixFS DAG programmatically, `globSource` is a helper for merkleize files and directories from your *actual* filesystem into a UnixFS DAG. This is much more practical for real-world use cases where you want to add static site builds or any other file to IPFS.

The [`globSource`](https://ipfs.github.io/helia/functions/_helia_unixfs.index.globSource.html) function allows you to easily add files from the filesystem using [glob](https://github.com/mrmlnc/fast-glob) patterns, making it simple to include or exclude specific files and directories based on their paths and names.

## Challenge

Create a node.js script (ESM) that exports a default async function:

```js
export default async function(path, globPattern) {
  // your code
}
```

The function should:

1. Create a Helia instance using `@helia/http`
2. Use `@helia/unixfs` with `globSource` to add all files matching the globPattern in `path`.
3. Return the CID of the root directory

## Verify

Once you have done this, verify your solution:

```console
$ helia-adventure verify path/to/solution.mjs
```

## Hints

- Import `createHeliaHTTP` from `@helia/http`
- Import `unixfs` and `globSource` from `@helia/unixfs`
- Use `globSource(path, '**/*')` to create the source
- Use `fs.addAll()` with `wrapWithDirectory: true` option
- The last CID returned by `fs.addAll()` is the root directory CID
- Save your solution as `3.mjs` in the current directory

## References

- Helia API docs: https://ipfs.github.io/helia/
- globSource API docs: https://ipfs.github.io/helia/functions/_helia_unixfs.index.globSource.html
- UnixFS docs: https://github.com/ipfs/helia-unixfs
- Glob options: https://github.com/mrmlnc/fast-glob#options-3