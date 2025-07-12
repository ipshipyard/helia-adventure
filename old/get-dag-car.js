// @ts-check
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { identify } from '@libp2p/identify'
import { tcp } from '@libp2p/tcp'
import { createHelia } from 'helia'
import { createLibp2p } from 'libp2p'
import { keys } from '@libp2p/crypto'
import { mdns } from '@libp2p/mdns'
import { FsBlockstore } from 'blockstore-fs'
import { FsDatastore } from 'datastore-fs'
import { dagCbor } from '@helia/dag-cbor'
import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht'
import { CID } from 'multiformats/cid'
import { car as CAR } from '@helia/car'
import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { ping } from '@libp2p/ping'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('No argument provided')
  console.error('Usage: node get-local-car.js <cid> <output-car-file>.car')
  process.exit(1)
}

// the blockstore is where we store the blocks that make up files
const blockstore = new FsBlockstore('./blockstore')

// application-specific data lives in the datastore
const datastore = new FsDatastore('./datastore')

// libp2p is the networking layer that underpins Helia
const libp2p = await createLibp2p({
  datastore,
  addresses: {
    listen: ['/ip4/127.0.0.1/tcp/0'],
  },
  transports: [tcp()],
  connectionEncrypters: [noise()],
  streamMuxers: [yamux()],
  peerDiscovery: [mdns()],
  services: {
    identify: identify(),
    ping: ping(),
    lanDHT: kadDHT({
      protocol: '/ipfs/lan/kad/1.0.0',
      peerInfoMapper: removePublicAddressesMapper,
      clientMode: false
    }),
  },
})

const node = await createHelia({
  datastore,
  blockstore,
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

const car = CAR(node)

// const cid = CID.parse(args[0])
const cid = CID.parse('bafyreicdplmrqyipzs665s6pyrnj3enmzr4emawhd3gxzx2l3aqdid3aq4')

for await (const c of node.pins.add(cid)) {
  console.log(`pinned ${c.toString()}`)
}

const carStream = car.stream(cid)

const writeStream = fs.createWriteStream(args[1])

await pipeline(carStream, writeStream)
