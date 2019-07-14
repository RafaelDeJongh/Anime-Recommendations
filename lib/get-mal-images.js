const fs      = require('fs')
const path    = require('path')
const request = require('request')
const sharp   = require('sharp')

const utils = require('./utils')

let dir    = './cache/covers'
let dirOut = './src/img/covers'

utils.checkFolderExists(dir)
utils.checkFolderExists(dirOut)

let getImage = (uri, slug, title) => {
  // Get filename from URL and generate save path.
  let filenameNew = slug + '.jpg'
  let savePath    = path.join(dir, filenameNew)

  // Only download the image if it's not in cache.
  if (!fs.existsSync(savePath)) {
    request.head(uri, (err, res, body) => {
      if (err) {
        return console.log('Error requesting image from MAL.')
      }

      request(uri).pipe(fs.createWriteStream(savePath)).on('finish', () => {
        resizeImage(filenameNew, title)
      })
    })
  } else {
    resizeImage(filenameNew, title)
  }
}

let resizeImage = (file, title) => {
  const input  = path.join(dir, file)
  const output = path.join(dirOut, file)

  // Downscale images wider than 240px.
  sharp(input)
  .resize({
    width: 240,
    withoutEnlargement: true
  })
  .toFile(output)
  .then((data) => {
    console.log('Saved cover for:', title)
  })
  .catch((error) => {
    console.log('Error:', error)
  })
}

module.exports = {
  getImage
}
