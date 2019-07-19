'use strict'

const fs    = require('fs')
const https = require('https')
const path  = require('path')

const animeJSON = require('./generate-json')
const utils     = require('./utils')

// Make sure cache folder exists.
const cache_dir = './cache/anime-data'
utils.checkFolderExists(cache_dir)

let errors_found = false
const files = fs.readdirSync(cache_dir)
files.forEach(file => {
  const rawData = fs.readFileSync(path.join(cache_dir, file)).toString()
  const parsedData = JSON.parse(rawData)

  if (!parsedData.data.Media) {
    console.log('Incomplete JSON data for ID:', file)
    errors_found = true
  }
})

if (errors_found) {
  console.log('\nErrors found, check lines above for details.')
} else {
  console.log('Operation complete without errors, all cached JSON data seems valid.')
}
