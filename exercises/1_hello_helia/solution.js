import { createHeliaHTTP } from '@helia/http'
import { unixfs } from '@helia/unixfs'

const helia = await createHeliaHTTP()
const fs = unixfs(helia)

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const data = encoder.encode('Hello, Helia!')

const cid = await fs.add(data)
console.log(`Added data with CID: ${cid}`)

const retrieved = decoder.decode(await fs.cat(cid))
console.log(`Retrieved: ${retrieved}`)