const path = require('node:path')
const url = require('node:url')

async function loadSolution (solution) {
  let file = solution

  if (!path.isAbsolute(file)) {
    file = path.resolve(path.join(process.cwd(), solution))
  }

  return await import(url.pathToFileURL(file))
}

module.exports = {
  loadSolution
}
