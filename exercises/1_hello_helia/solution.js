import { createHeliaHTTP } from '@helia/http'
import { json } from '@helia/json'

const helia = await createHeliaHTTP()
const j = json(helia)

const cid = await j.add({ hello: 'helia' })
console.log(`Added data with CID: ${cid}`)
