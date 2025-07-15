## Hello Helia

[Helia](https://github.com/ipfs/helia/) is the modern TypeScript implementation of IPFS for use in browsers and servers (Node.js and other JS run-times).

To use Helia, you create a Helia instance with either the `helia` or `@helia/http` (lightweight version of the Helia that functions only over HTTP), and then pass the instance to the various sub-modules like `@helia/unixfs`.

In this exercise, you'll create a Helia node and generate a Content Identifiers (CID) for a JSON object encoded as a UTF-8 string.

CIDs are a fundamental building block in IPFS for addressing anything from a JSON object to large dataset.

## Challenge

Create a node.js script (ESM modules) that exports a default async function:

```js
export default async function() {
  // your
}
```

The function should:

1. Create a Helia instance using `@helia/http`
2. Use the `@helia/json` and generate a CID for `{ "hello": "helia" }`
3. Return the CID from the function

## Verify

Once you have done this, verify your solution:

```console
$ helia-adventure verify path/to/1.mjs
```

## Hints

- Import `createHeliaHTTP` from `@helia/http`
- Import `json` from `@helia/json`
- Save your solution as `1.mjs` in the current directory.

## References
   Helia API docs: https://ipfs.github.io/helia/