import { createReadStream } from 'node:fs'
import { CarReader } from '@ipld/car'

export async function getCarRootCid (carFilePath) {
  const carFileStream = createReadStream(carFilePath)
  const reader = await CarReader.fromIterable(carFileStream)

  return await reader.getRoots()
}
