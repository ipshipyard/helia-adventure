const Exercise = require('workshopper-exercise')
const { spawn } = require('child_process')

const exercise = new Exercise({
  name: 'HELLO_HELIA',
  title: 'Hello Helia',
  problem: {
    file: './problem.md'
  },
  solution: {
    file: './solution.js'
  }
})

exercise.addVerifyProcessor(function (args, callback) {
  if (!args || args.length === 0) {
    return callback(new Error('No solution file provided. Usage: helia-workshop verify solution.js'))
  }

  const solutionFile = args[0]
  
  if (!solutionFile.endsWith('.js')) {
    return callback(new Error('Solution file must be a JavaScript file (.js)'))
  }

  const child = spawn('node', [solutionFile], {
    cwd: process.cwd(),
    stdio: 'pipe'
  })

  let output = ''
  let error = ''

  child.stdout.on('data', (data) => {
    output += data.toString()
  })

  child.stderr.on('data', (data) => {
    error += data.toString()
  })

  child.on('close', (code) => {
    if (code !== 0) {
      return callback(new Error(`Solution exited with code ${code}. Error: ${error}`))
    }

    if (output.includes('Added data with CID:') && output.includes('Retrieved: Hello, Helia!')) {
      this.pass('✓ Correctly added and retrieved data with CID')
      return callback(null, true)
    } else {
      this.fail('✗ Output should contain "Added data with CID:" and "Retrieved: Hello, Helia!"')
      return callback(null, false)
    }
  })

  child.on('error', (err) => {
    callback(new Error(`Failed to run solution: ${err.message}`))
  })
})

module.exports = exercise