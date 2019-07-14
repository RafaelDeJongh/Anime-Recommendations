const fs = require('fs')

const animeJSON    = require('./lib/generate-json')
const getMalImages = require('./lib/get-mal-images')
// const anilist      = require('./lib/anilist')
const utils        = require('./lib/utils')

animeJSON.generateJSON()

let data = fs.readFileSync('anime.json').toString()
    data = JSON.parse(data)

let output_anime = '',
    output_categories = ''

for (let i = 0; i < data.lists.length; i++) {
  const list      = data.lists[i]
  let   list_slug = utils.slug(list.list_name)

  output_categories += `<button class="filter-button" data-filter="${list_slug}">${list.list_name}</button>\n`

  // Add top-10 class if necessary.
  if (list.top_10) {
    list_slug = list_slug + ' top-10'
  }

  for (let i = 0; i < list.list_items.length; i++) {
    const anime      = list.list_items[i]
    const anime_alt  = anime.title.replace(/"/g, "'")
    const anime_slug = utils.slug(anime.title)
    const webp       = anime_slug + '.webp'
    const jpeg       = anime_slug + '.jpg'

    // anilist.getMeta(anime.id, (meta) => {})

    // Write HTML at /src/partials/anime.hbs
    output_anime += `
    <a class="anime ${list_slug}" href="https://myanimelist.net/anime/${anime.id}" target="_blank">
      <figure>
        <picture>
          <source data-srcset="img/covers/${webp}" type="image/webp">
          <source data-srcset="img/covers/${jpeg}" type="image/jpeg">
          <img class="lazyload" data-src="img/covers/${jpeg}" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="${anime_alt}">
        </picture>
        <figcaption>${anime.title}</figcaption>
      </figure>
    </a>`

    // Get Images from MAL, store them locally, and generate lower-res thumbnails.
    getMalImages.getImage('https://cdn.myanimelist.net/images/anime/' + anime.image, anime_slug, anime.title)
  }
}

fs.writeFileSync('./src/partials/categories.hbs', output_categories)
fs.writeFileSync('./src/partials/anime.hbs', output_anime)
