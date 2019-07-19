'use strict'

const fs    = require('fs')
const https = require('https')
const path  = require('path')


const animeJSON = require('./generate-json')
const utils     = require('./utils')

// Make sure cache folder exists.
const cache_dir = './cache/anime-data'
utils.checkFolderExists(cache_dir)

// Request data for given anime and save response in local cache.
function anilist_request(animeID, callback) {
  const query = `
  query ($idMal: Int) {
      Media (idMal: $idMal, type: ANIME) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        description
        season
        format
        episodes
        duration
        genres
        startDate {
          year
          month
          day
        }
      }
    }
  `

  const variables = {
    idMal: animeID
  }

  const post_data = JSON.stringify({
    query: query,
    variables: variables
  })

  var post_options = {
    host: 'graphql.anilist.co',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  // Set up the request.
  var post_req = https.request(post_options, function(res) {
    let rawData = ''

    res.on('data', (chunk) => {
      rawData += chunk
    })

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData)
        // console.log('AniList Response:', parsedData)

        // Save response in cache.

        // if (parsedData.errors) {
        //   // TODO: deal with too many requests error and avoid loops.
        // } else {
        fs.writeFileSync(path.join(cache_dir, animeID.toString() + '.json'), rawData)
        console.log('Saved data for ID ' + animeID + ' in cache.')
        // }
      } catch (e) {
        console.error(e.message)
      }
    })
  }).on('error', (e) => {
    console.error('Got error:', e.message)
  })

  // post the data
  post_req.write(post_data)
  post_req.end()
}

// Checks if there's cached data from given anime id and returns it,
// if not, it tries to get download data from Anilist.co API.
function getMeta(animeID, callback) {
  // Check if anime ID is saved in cache.
  const cache_file = path.join(cache_dir, animeID.toString() + '.json')
  if (fs.existsSync(cache_file)) {
    let cache = fs.readFileSync(cache_file).toString()
        cache = JSON.parse(cache)

    // console.log('Cached Response (' + animeID + '):', cache.data.Media)

    callback(cache.data.Media)
  } else {
    anilist_request(animeID, () => {
      // Once response is saved call anilist() again,
      // which will read from cache.

      // TODO: Disabled to avoid infinite looping request until this
      // is refactored in a better way.
      // getMeta(animeID)
    })
  }
}


// Update JSON, then loop through and request AniList API with each anime ID.
animeJSON.generateJSON()

let data = fs.readFileSync('anime.json').toString()
    data = JSON.parse(data)

for (let i = 0; i < data.lists.length; i++) {
  const list = data.lists[i]

  for (let i = 0; i < list.list_items.length; i++) {
    const anime = list.list_items[i]
    let anilist_counter = 0

    // Respect max number of requests to AniList API.
    if (anilist_counter > 89) {
      console.log('Max AniList requests exhausted (90 per minute).')
      console.log(list.list_items.length - i + ' anime titles were not processed.')
      console.log('Please re-run this script in a couple of minutes.')
      return
    }

    // Request AniList API.
    getMeta(anime.id, () => {
      anilist_counter++

      // If done iterating, confirm before exiting.
      if (i === list.list_items.length) {
        console.log('Operation complete, all anime titles cached.')
      }
    })
  }
}
