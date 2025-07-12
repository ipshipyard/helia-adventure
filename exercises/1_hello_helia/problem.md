# Hello IPFS

The InterPlanetary File System (IPFS) is a set of building blocks for a better web: content-addressed, verifiable, and censorship-resistant.

On a more technical level, IPFS is a set of open protocols and implementations for addressing, routing, and transferring data on the web, built on the ideas of content addressing and peer-to-peer networking.

## Key IPFS operations

IPFS implementations expose APIs for three key operations:

1. **Content-addressing / Merkleizing**: taking input data and structuring it such that it's addressable and verifiable by a unique content identifier (CID) using cryptographic hashes.
2. **Providing:**: hosting the data such that other IPFS nodes can find and connect to the node (content routing) and retrieve the data
3. **Retrieving:** given a CID, find other IPFS nodes providing the content, connect to them, and fetch the data, verifying the data incrementally.

For a more comprehensive overview of the life cycle, check out the [docs article](https://docs.ipfs.tech/concepts/lifecycle).

## Hello Helia

[Helia](https://github.com/ipfs/helia/) is the modern TypeScript implementation of IPFS for use in browsers and servers (Node.js and other JS run-times).

To use Helia, you create a Helia instance with either the `helia` or `@helia/http` (lightweight version of the Helia that functions only over HTTP), and then pass the instance to the various sub-modules.

In this exercise, you'll create a Helia node and generate a Content Identifiers (CID) for a JSON object encoded as a UTF-8 string.

CIDs are a fundamental building block in IPFS for addressing anything from a JSON object to large dataset.

## Your Task

Create a script that:

1. Creates a Helia instance using `createHeliaHTTP()` from `@helia/http`
2. Use the `@helia/json` and generate a CID for `{ "hello": "helia" }`
3. Print the generated CID.

## Requirements

- Use `@helia/http` to create a Helia instance.

## Example Usage

```bash
node your-solution.js
```

Expected output format:
```
Added data with CID: <CID>
```

## Hints

- Import `createHeliaHTTP` from `@helia/http`
- Import `json` from `@helia/json`
- Refer to the Helia API docs: https://ipfs.github.io/helia/

Save your solution as `solution.js` in the current directory.