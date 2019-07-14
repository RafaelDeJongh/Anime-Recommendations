'use strict'

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this
    var args = arguments

    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    var callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

const filter_input = document.querySelector('[data-search]')
const clear_filter = document.getElementById('search-clear')

clear_filter.addEventListener('click', () => {
  filter_input.value = ''
  filter()
})

// Keep track of what category is selected if any.
let category = []

// Debounce filter function.
filter_input.addEventListener('keyup', debounce(filter, 200))

// Filter Anime by name.
function filter() {
  var term = filter_input.value.toLowerCase()
  var tag  = document.querySelector('.items').getElementsByTagName('a')
  var name = document.querySelector('.items').getElementsByTagName('figcaption')

  // If we have a category filtered, only affect that (ignore already hidden anime).
  if (category.length > 0) {
    tag = document.querySelectorAll('.items .' + category)
    name = document.querySelectorAll('.items .' + category + ' figcaption')
  }

  // For each anime, add or remove the hidden class.
  for (var i = 0; i < tag.length; i++) {
    if (name[i].innerHTML.toLowerCase().indexOf(term) !== -1) {
      tag[i].classList.remove('hidden')
    } else {
      tag[i].classList.add('hidden')
    }
  }

  // Exclude anime in top 10 lists from manual filtering,
  // unless a top 10 category is already active.
  if (term && !category.includes('top-10')) {
    let top_10_anime = document.querySelectorAll('.top-10')
    for (var i = 0; i < top_10_anime.length; i++) {
      top_10_anime[i].classList.add('hidden')
    }
  }

  // Clear filter search button.
  if (term) {
    clear_filter.classList.remove('hidden')
  } else {
    clear_filter.classList.add('hidden')
  }
}

// Category Filter Buttons.
var filtersElem = document.querySelector('.filter-button-group')

filtersElem.addEventListener('click', function(event) {
  event.preventDefault()

  // Don't act on click on the button wrapper.
  if (event.target.classList.contains('filter-button-group')) {
    return
  }

  // If this button is already active, toggle it off and show all categories.
  if (event.target.classList.contains('filter-button-active')) {
    event.target.classList.remove('filter-button-active')

    let show = document.getElementsByClassName('anime')
    for (let i = 0; i < show.length; i++) {
      const el = show[i]
      el.classList.remove('hidden')
    }

    // Reset category array and update filter function.
    category = []
    filter()

    return
  }

  // Set button active states.
  let buttons = document.getElementsByClassName('filter-button')
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.classList.remove('filter-button-active')
  }

  event.target.classList.add('filter-button-active')

  // Get data-filter atribute for selected category.
  category = event.target.getAttribute('data-filter')

  // If target is null abort.
  if (null === category) {
    return
  }

  // Hide all items.
  let hide = document.getElementsByClassName('anime')
  for (let i = 0; i < hide.length; i++) {
    const el = hide[i]
    el.classList.add('hidden')
  }

  // Then show the intended selection.
  let show = document.getElementsByClassName(category)
  for (let i = 0; i < show.length; i++) {
    const el = show[i]
    el.classList.remove('hidden')
  }

  // Make sure current filter (if active) is re-run on selected category.
  filter()
})
