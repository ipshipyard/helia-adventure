const path = require('path')
const exercise = require('workshopper-exercise')()
const verifyProcessor = require('workshopper-verify-processor')
const { getCarRootCid } = require('../../lib/car.mjs')
const { loadSolution } = require('../../lib/utils.js')

exercise.addVerifyProcessor(verifyProcessor(exercise, async (test) => {
  const { default: solutionFn } = await loadSolution(exercise.args[0])

  await test.truthy(typeof solutionFn === 'function', 'default_export_a_function')

  const outputCarFile = path.join(__dirname, 'test-output.car')
  try {
    await solutionFn(path.join(__dirname, 'test-data'), '**/*', outputCarFile)
  } catch (error) {
    console.error('failed to run solution function', error)
    throw error
  }

  const rootCid = await getCarRootCid(outputCarFile)

  await test.equals(rootCid.toString(), 'bafybeiawmlbbooqojiyyco4lckc2ujo26fqar6zqajoxtzsqccnjbvsm5y', 'car_correct_cid')
}))

module.exports = exercise
