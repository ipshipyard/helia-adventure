// @ts-check
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { identify } from '@libp2p/identify'
import { tcp } from '@libp2p/tcp'
import { createHelia } from 'helia'
import { createLibp2p } from 'libp2p'
import { keys } from '@libp2p/crypto'
import { mdns } from '@libp2p/mdns'
import { dagCbor } from '@helia/dag-cbor'
import { CID } from 'multiformats/cid'
import { libp2pRouting } from '@helia/routers'
import { ping } from '@libp2p/ping'
import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht'


const args = process.argv.slice(2)

// Example of how to use arguments
if (args.length === 0) {
  console.error('No argument provided')
  console.error('Usage: node local-mesh-get.js <cid>')
  process.exit(1)
}

// libp2p is the networking layer that underpins Helia
const libp2p = await createLibp2p({
  addresses: {
    listen: [
      '/ip4/0.0.0.0/tcp/0',
    ],
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
  libp2p,
  routers: [libp2pRouting(libp2p)],
})

console.log('Started node with id: ', node.libp2p.peerId.toString())

// listen for peer discovery events triggered by the mdns peer discovery module
node.libp2p.addEventListener('peer:discovery', async (evt) => {
  console.log(
    `Discovered new peer (${evt.detail.id.toString()}) via MDNS. Dialling...`,
    evt.detail.multiaddrs.map((ma) => ma.toString()),
  )
  try {
    await node.libp2p.dial(evt.detail.multiaddrs) // dial the new peer
  } catch (e) {
    console.error('Error dialing peer', e)
  }
})

const d = dagCbor(node)

const cid = CID.parse(args[0])

const obj = await d.get(cid)

console.log(`Got CID: ${cid.toString()}`, obj)
process.exit(0)
