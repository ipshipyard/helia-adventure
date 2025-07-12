// @ts-check
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { identify } from '@libp2p/identify'
import { tcp } from '@libp2p/tcp'
import { createHelia } from 'helia'
import { createLibp2p } from 'libp2p'
import { mdns } from '@libp2p/mdns'
import { dagCbor } from '@helia/dag-cbor'
import { car as CAR } from '@helia/car'
import fs from 'node:fs'
import { CarReader } from '@ipld/car'
import { CID } from 'multiformats/cid'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('No argument provided')
  console.error('Usage: node car-provide.js <car-file>.car')
  process.exit(1)
}

// // libp2p is the networking layer that underpins Helia
// const libp2p = await createLibp2p({
//   addresses: {
//     listen: ['/ip4/127.0.0.1/tcp/0'],
//   },
//   transports: [tcp()],
//   connectionEncrypters: [noise()],
//   streamMuxers: [yamux()],
//   peerDiscovery: [mdns()],
//   services: {
//     identify: identify(),
//   },
// })

const node = await createHelia({
  libp2p: {
    peerDiscovery: [mdns()],
  },
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

const car = CAR(node)
const d = dagCbor(node)

const reader = await CarReader.fromIterable(fs.createReadStream(args[0]))

await car.import(reader)

console.log('providing CIDs from', args[0])

// const block = await d.get(CID.parse('bafyreicdplmrqyipzs665s6pyrnj3enmzr4emawhd3gxzx2l3aqdid3aq4'))
// console.log(block)
