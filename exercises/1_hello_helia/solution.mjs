import { createHeliaHTTP } from '@helia/http'
import { json } from '@helia/json'

export default async function () {
  const helia = await createHeliaHTTP()
  const j = json(helia)

  const cid = await j.add({ hello: 'helia' })

  return cid
}
