/* eslint-disable no-console */
// @ts-check
import { createHelia } from 'helia'
import { dagCbor } from '@helia/dag-cbor'
import { createLocalMeshLibp2p } from './utils.js'

const args = process.argv.slice(2)

// Example of how to use arguments
if (args.length === 0) {
  console.error('No argument provided')
  console.error('Usage: node local-mesh-share.js <name> <message>')
  process.exit(1)
}

const libp2p = await createLocalMeshLibp2p()

const node = await createHelia({
  libp2p,
})

console.log('Started node with id: ', node.libp2p.peerId.toString())

// listen for peer discovery events triggered by the mdns peer discovery module
node.libp2p.addEventListener('peer:discovery', async (evt) => {
  console.log(
    `Discovered new peer (${evt.detail.id.toString()}) via MDNS. Dialling...`,
    evt.detail.multiaddrs.map((ma) => ma.toString()),
  )
  await node.libp2p.dial(evt.detail.multiaddrs) // dial the new peer
})

const d = dagCbor(node)

// Encode a message with DAG-CBOR
const cid = await d.add({
  name: args[0],
  message: args[1],
})

console.log(`Added message: ${args[1]}: ${cid.toString()}`)

console.log('providing', cid)
await node.routing.provide(cid)
console.log('provided', cid)
