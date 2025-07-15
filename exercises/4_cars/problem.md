## CAR files

In the previous exercises, we learned how to create UnixFS DAGs using Helia, where files and directories are chucked into binary data blocks each identified by a CID (Content Identifier).

Helia stores these blocks in a blockstore, which just a key-value interface where the keys are CIDs and the values are `Uint8Array` binary data blocks. 

There are multiple [implementations of blockstores](https://github.com/ipfs/js-stores), such as in-memory, filesystem, indexedDB (for browsers), and more.

But what if you want to store these blocks in a file? This is where CAR files come in.

Content Addressable aRchives (CAR) files are a way of packaging up content addressed data into archive files that can be easily stored and transferred. You can think of them like TAR files that are designed for storing collections of content addressed data.

💡 Fun fact: Bluesky user repo exports are CAR files.

## Challenge

In this exercise, you will take build on the solution from the previous exercise and instead of returning a CID, create a CAR file containing the UnixFS DAG.

Create a node.js script (ESM) that exports a default async function:

```js
export default async function(path, globPattern, outputCarPath) {
  // your code
}
```

The function should:

1. Create a Helia instance using `@helia/http`
2. Use `@helia/unixfs` with `globSource` to add all files matching the globPattern in `path`.
3. Use `@helia/car` to create a CAR file stream from the last CID  that can be written to a file.
4. Create a file on disk at `outputCarPath` and pipe the CAR file stream to it.

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
- Use `fs.createWriteStream()` to create a writable stream for the output CAR file
- Use `pipeline` from `node:stream/promises` to pipe from a readable stream to a write stream
- Save your solution as `3.mjs` in the current directory

## References

- Helia API docs: https://ipfs.github.io/helia/
- Blockstore interface: https://ipfs.github.io/js-stores/interfaces/interface-blockstore.Blockstore.html
- globSource API docs: https://ipfs.github.io/helia/functions/_helia_unixfs.index.globSource.html
- UnixFS docs: https://github.com/ipfs/helia-unixfs
- Glob options: https://github.com/mrmlnc/fast-glob#options-3