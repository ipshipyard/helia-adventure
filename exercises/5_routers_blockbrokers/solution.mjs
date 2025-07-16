import { bitswap, trustlessGateway } from '@helia/block-brokers'
import { delegatedHTTPRouting } from '@helia/routers'
import { unixfs } from '@helia/unixfs'
import { createHelia } from 'helia'

export default {
  async bitswapNode (cid) {
    const helia = await createHelia({
      blockBrokers: [bitswap()],
      routers: [delegatedHTTPRouting('https://delegated-ipfs.dev')]
    })

    const fs = unixfs(helia)
    const stat = await fs.stat(cid)

    await helia.stop()
    return stat
  },

  async gatewayNode (cid) {
    const helia = await createHelia({
      blockBrokers: [trustlessGateway()],
      routers: [delegatedHTTPRouting('https://delegated-ipfs.dev')]
    })

    const fs = unixfs(helia)
    const stat = await fs.stat(cid)

    await helia.stop()
    return stat
  }
}
