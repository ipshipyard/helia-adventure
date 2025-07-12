// @ts-check
import { createHelia } from 'helia'
import { FsBlockstore } from 'blockstore-fs'
import { FsDatastore } from 'datastore-fs'

const node = await createHelia({
  // application-specific data lives in the datastore
  datastore: new FsDatastore('./datastore'),
  // the blockstore is where we store the blocks that make up files
  blockstore: new FsBlockstore('./blockstore'),
})

console.log('Started node with id: ', node.libp2p.peerId.toString())
