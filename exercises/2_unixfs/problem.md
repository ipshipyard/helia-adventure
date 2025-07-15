## UnixFS

[UnixFS](https://github.com/ipfs/specs/tree/master/unixfs) is the binary format used by IPFS to represent files and directories. It allows you to create immutable content-addressed representation of a filesystem, where directories and files are all addressed by CIDs:

UnixFS has the following properties:

- A single CID can be used to address (and verify) anything from a single file to a large directory of any size
-  large files are chunked into smaller chunks, allowing for incremental verification
- Perfect for publishing static sites and apps with IPFS: you can take build outputs encode them with UnixFS
- 

## Challenge

Create a node.js script (ESM) that exports a default async function:

```js
export default async function() {
  // your code
}
```

The function should:

1. Create a Helia instance using `@helia/http`
2. Use `@helia/unixfs` to create a directory structure like:
   ```
   my-folder/
   ├── file1.txt (content: "First file")
   └── file2.txt (content: "Second file")
   ```
3. Return the CID of the root directory

## Verify

Once you have done this, verify your solution:

```console
$ helia-adventure verify path/to/solution.mjs
```

## Hints

- Import `createHeliaHTTP` from `@helia/http`
- Import `unixfs` from `@helia/unixfs`
- Create file objects with `path` and `content` properties
- Use `TextEncoder` to encode string content to `Uint8Array`
- Use `UnixFS.addAll()` with an array of file objects
- Save your solution as `2.mjs` in the current directory

## References

- Helia API docs: https://ipfs.github.io/helia/
- `@helia/unixfs` API docs: https://ipfs.github.io/helia/modules/_helia_unixfs.html
- `UnixFS` Interface docs: https://ipfs.github.io/helia/interfaces/_helia_unixfs.index.UnixFS.html
- UnixFS docs: https://docs.ipfs.tech/concepts/file-systems/#unix-file-system-unixfs
- UnixFS spec: https://github.com/ipfs/specs/blob/main/UNIXFS.md