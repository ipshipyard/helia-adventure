import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { identify } from '@libp2p/identify'
import { tcp } from '@libp2p/tcp'
import { createLibp2p } from 'libp2p'
import { mdns } from '@libp2p/mdns'
import { ping } from '@libp2p/ping'
import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht'

export async function createLocalMeshLibp2p(options = {}) {
  return await createLibp2p({
    ...options,
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
        peerInfoMapper: removePublicAddressesMapper
      }),
    },
  })
}
