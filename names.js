const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { capitalize } = require('lodash')
const Promise = require('bluebird')

const capitalizedName = name => name.split(' ').map(capitalize).join(' ') 

function getNames(source) {
  const lines = []
  const reader = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input', source))
  })
  
  return new Promise((resolve, reject) => {    
    reader.on('line', line => {
      const [name, email] = line.split(',')
      lines.push({
        name: capitalizedName(name),
        email: email || ''
      })
    })
    .on('close', () => resolve(lines))
    .on('error', error => reject(error))
  })
  .then(names => 
    names.filter(n => n.name && n.email)
  )
}

module.exports = {
  getNames
}
