const fs = require('fs')

function generateJSON() {
  let data = fs.readFileSync('README.md').toString()

  let animeArray = [],
      m,
      regex = /## .+|(?:- |\d\. )(.+?) <!-- ([^ ]+).{3}([^ ]+)/gm

  let currentCategoryIndex = -1

  while ((m = regex.exec(data)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches.
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // Parse categories and anime entries.
    m.forEach((match, groupIndex) => {
      if (typeof match == 'string' && match.startsWith('## ')) {
        // Anime Category
        match = match.replace('## ', '')
        currentCategoryIndex++

        // Check if this list is a "Top 10".
        let top = false
        if (match.includes('Top 10')) {
          top = true
        }

        // Create category object.
        let animeCategory = {
          list_name: match,
          top_10: top,
          list_items: []
        }

        animeArray.push(animeCategory)
      } else if (0 === groupIndex) {
        // Anime Entry

        // Create Anime object.
        let animeEntry = {
          title: m[1],
          id: m[2],
          image: m[3]
        }

        animeArray[currentCategoryIndex].list_items.push(animeEntry)
      }
    })
  }

  // Create JSON root.
  let object = {
    title: "Rafaël De Jongh's Anime Recommendations",
    description: "Anime recommendation list created by Rafaël De Jongh",
    url: "https://rafaeldejongh-sites.ga/AnimeRecommendations/",
    animelist: "https://myanimelist.net/profile/RafaelDeJongh",
    mal_username: "RafaelDeJongh",
    author: "Rafaël De Jongh",
    portfolio: "https://www.rafaeldejongh.com",
    last_update_utc: new Date().toISOString(),
    lists: []
  }

  // Add category and anime data to JSON.
  object.lists = animeArray

  let output = JSON.stringify(object)

  // Write JSON file.
  fs.writeFileSync('./anime.json', output)
}

module.exports = {
  generateJSON
}
