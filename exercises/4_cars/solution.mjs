import { createWriteStream } from 'fs'
import { pipeline } from 'node:stream/promises'
import { car } from '@helia/car'
import { createHeliaHTTP } from '@helia/http'
import { unixfs, globSource } from '@helia/unixfs'

export default async function (globPath, globPattern, outputCarPath) {
  const helia = await createHeliaHTTP()
  const fs = unixfs(helia)
  const c = car(helia)

  const source = globSource(globPath, globPattern)

  let rootCid
  for await (const entry of fs.addAll(source, { wrapWithDirectory: true })) {
    rootCid = entry.cid
  }

  const carFileStream = createWriteStream(outputCarPath)

  await pipeline(c.stream(rootCid), carFileStream)
}
