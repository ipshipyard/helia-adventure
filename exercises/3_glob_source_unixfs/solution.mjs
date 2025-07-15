import { createHeliaHTTP } from '@helia/http'
import { unixfs, globSource } from '@helia/unixfs'

export default async function (globPath, globPattern) {
  const helia = await createHeliaHTTP()
  const fs = unixfs(helia)

  const source = globSource(globPath, globPattern)

  let rootCid
  for await (const entry of fs.addAll(source, { wrapWithDirectory: true })) {
    rootCid = entry.cid
  }

  return rootCid
}
