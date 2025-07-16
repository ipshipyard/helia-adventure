## Content Routing with Block Brokers

In previous exercises, you created Helia nodes that focused on merkleization which is a local operation (which is why you used @helia/http to avoid unnecessary network traffic). Since IPFS is a distributed system, a big part of its power comes from being able to find and retrieve content across the network in a peer-to-peer fashion.

The key feature of content addressing and by extension, IPFS, is that the address, i.e. the CID, is decoupled from specific locations and remains permanent based on the data. However, to retrieve the data by CID, you still need to fetch it from somewhere, which is where the Helia node's routing and block retrieval capabilities come into play.

Retrieval in IPFS involves two steps::

- Content routing: finding peers that have the content you need: this is the role of **routers** in Helia
- Content retrieval: retrieving the blocks from those peers: this is the role of **block brokers** in Helia

The two work in tandem: routers find peers that have the content, and block brokers handle the actual retrieval of the blocks from those peers.

## Routers

Routers find providers (peers or HTTP gateway providers) that have the blocks you need:

- **`libp2pRouting`**: Uses the libp2p Kademlia DHT to find providers
- **`delegatedHTTPRouting`**: Uses HTTP delegated routing endpoints to find providers. Especially useful for browsers and low-resource environments where you want to avoid running a full DHT.
- **`httpGatewayRouting`**: uses public IPFS gateways as a provider. This is a bit like _cheating_ because it doesn't actually find peers, but rather just uses a known gateway to handle retrieval the content.

## Block Brokers

Block brokers are responsible for actually retrieving blocks from providers

Helia supports two block brokers:

- **`bitswap`**: Exchanges blocks with peers over libp2p connections
- **`trustlessGateway`**: Retrieves blocks from trustless gateways over HTTP(S)

## Challenge

Create a node.js script (ESM) that exports a default object with two async functions:

```js
export default {
  async bitswapNode(cid) {
    // your code - return the stat object using bitswap
  },
  async gatewayNode(cid) {
    // your code - return the stat object using trustless gateway
  },
}
```

The functions should:

- **`bitswapNode`**: Create a Helia instance with:

- `bitswap` block broker
- `delegatedHTTPRouting` router using `'https://delegated-ipfs.dev'`

- **`gatewayNode`**: Create a Helia instance with:

- `trustlessGateway` block broker
- `delegatedHTTPRouting` router using `'https://delegated-ipfs.dev'`

- Use `@helia/unixfs` to get stats for the provided CID using the `stat` function
- Stop the node when finished
- **Return the stat object**

This demonstrates how the same routing can work with different block retrieval methods.

## Verify

Once you have done this, verify your solution:

```console
$ helia-adventure verify path/to/solution.mjs
```

## Hints

- Import `{ bitswap, trustlessGateway }` from `@helia/block-brokers`
- Import `{ delegatedHTTPRouting }` from `@helia/routers`
- Import `{ createHelia }` from `helia`
- Import `{ unixfs }` from `@helia/unixfs`
- Pass `blockBrokers` and `routers` arrays to `createHelia()`
- Don't forget to call `.stop()` on each Helia instance

## References

- Helia API docs: https://ipfs.github.io/helia/
- UnixFS stat function: https://ipfs.github.io/helia/interfaces/_helia_unixfs.index.UnixFS.html#stat
- Block brokers docs: https://github.com/ipfs/helia-block-brokers
- Routers docs: https://github.com/ipfs/helia-routers
- Delegated Routing Endpoint: https://docs.ipfs.tech/concepts/public-utilities/#delegated-routing
