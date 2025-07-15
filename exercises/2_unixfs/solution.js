import { createHeliaHTTP } from '@helia/http'
import { unixfs } from '@helia/unixfs'

export default async function () {
  const helia = await createHeliaHTTP()
  const fs = unixfs(helia)

  const encoder = new TextEncoder()

  const files = [
    {
      path: 'my-folder/file1.txt',
      content: encoder.encode('First file')
    },
    {
      path: 'my-folder/file2.txt',
      content: encoder.encode('Second file')
    }
  ]

  let rootCid
  for await (const entry of fs.addAll(files, { wrapWithDirectory: true })) {
    if (entry.path === '') {
      rootCid = entry.cid
    }
  }

  return rootCid
}
