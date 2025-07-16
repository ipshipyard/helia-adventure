const exercise = require('workshopper-exercise')()
const verifyProcessor = require('workshopper-verify-processor')
const { loadSolution } = require('../../lib/utils.js')

exercise.addVerifyProcessor(verifyProcessor(exercise, async (test) => {
  const { default: solution } = await loadSolution(exercise.args[0])

  await test.truthy(typeof solution === 'object', 'default_export_an_object')
  await test.truthy(typeof solution.bitswapNode === 'function', 'bitswapNode_is_function')
  await test.truthy(typeof solution.gatewayNode === 'function', 'gatewayNode_is_function')

  const { CID } = await import('multiformats')

  const testCid = CID.parse('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')

  let bitswapResult
  let gatewayResult

  try {
    bitswapResult = await solution.bitswapNode(testCid)
  } catch (error) {
    console.error('failed to run bitswapNode function', error)
    throw error
  }

  try {
    gatewayResult = await solution.gatewayNode(testCid)
  } catch (error) {
    console.error('failed to run gatewayNode function', error)
    throw error
  }

  await test.truthy(bitswapResult && typeof bitswapResult === 'object', 'bitswap_returns_stat_object')
  await test.truthy(gatewayResult && typeof gatewayResult === 'object', 'gateway_returns_stat_object')
  await test.truthy(bitswapResult.cid && bitswapResult.cid.toString() === testCid.toString(), 'bitswap_correct_cid')
  await test.truthy(gatewayResult.cid && gatewayResult.cid.toString() === testCid.toString(), 'gateway_correct_cid')
}))

module.exports = exercise
