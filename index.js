const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const { each, map } = require('lodash')
const names = require('./names')

Promise.all([
  names.getNames('input_1.csv'),
  names.getNames('input_2.csv')
])
.spread((devfest, members) => {
  const result = {}
  const all = devfest.concat(members)
  each(all, ({name, email}) => {
    if (!result[name]) {
      result[name] = email
    }
  })
  const names = Object.keys(result).sort()
  const output = path.join(__dirname, 'output', 'diff.csv')
  each(names, (k, i) => fs.appendFileSync(output, `${i+1},${k},${result[k]}\n`))
})
.catch(console.error)
.finally(() => process.exit(0))
