;(function initializepage() {
  getForm().then(response => populateForm(response))
})()

var select = document.querySelector('select')
var option = document.querySelector('option')

function getForm() {
  return fetch('players.json').then(response => {
    if (!response.ok) {
      console.error(response)
    }
    return response.json()
  })
}

function getGames() {
  return fetch('games.json').then(response => {
    if (!response.ok) {
      console.error(response)
    }
    return response.json()
  })
}

var player = document.querySelector('#player')
getForm()
function populateForm(response) {
  response.forEach(name => {
    var label = document.createElement('option')
    label.textContent = name.name
    select.appendChild(label)
  })
}
// //
// select.addEventListener('change', () => {
//   document.getElementById('games').remove()
//   // document.getElementById('box').remove()
//   // document.getElementById('box').remove()
//   // document.getElementById('box').remove()
//   // document.getElementById('box').remove()
// })

// select.addEventListener('change', () => {
//   var newList = document.querySelector('#gamebox')
//   var $ul = document.createElement('ul')
//   $ul.id = 'games'
//   newList.appendChild($div)
// })

select.addEventListener('change', () => {
  pickGame(select.value)
})

function pickGame(name) {
  getForm().then(response => {
    var filteredPlayer = response.filter(player => name === player.name)[0]
    getGames().then(response => {
      filteredPlayer.games.map(game => {
        return response.data.filter(responseGame => {
          if (game === responseGame.name) {
            var list = document.querySelector('#games')
            var $li = document.createElement('li')
            $li.id = 'box'
            list.appendChild($li)

            var $h3 = document.createElement('h3')
            $h3.textContent = responseGame.name
            $li.appendChild($h3)

            var $span = document.createElement('span')
            $span.textContent = 'Number of players: ' + responseGame.number
            $li.appendChild($span)

            var $p = document.createElement('p')
            $p.textContent = 'Time: ' + responseGame.time
            $li.appendChild($p)

            var $p = document.createElement('p')
            $p.textContent = 'Complexity: ' + responseGame.complexity
            $li.appendChild($p)

            var $p = document.createElement('p')
            $p.textContent = 'Category: ' + responseGame.category
            $li.appendChild($p)

            var $h4 = document.createElement('h4')
            $h4.textContent = 'Game owner: ' + filteredPlayer.name
            $li.appendChild($h4)

            return responseGame
          }
        })
      })
    })
  })
}

document.getElementById('button').addEventListener('click', event => {
  event.preventDefault()
  var form = document.querySelector('form')
  var player = document.querySelector('.player').selectedIndex
  var name = document.getElementById('game').value
  var number = document.getElementById('number').value
  var time = document.getElementById('time').value
  var complexity = document.getElementById('complexity').value
  var category = document.getElementById('category').value
  let gameObject = {
    name: name,
    number: number,
    time: time,
    complexity: complexity,
    category: category
  }
  postGameForm(gameObject)
  return gameObject

  // document.getElementById('form').reset()
})

// document.getElementById('button').addEventListener('click', event => {
//   event.preventDefault()
//   var form = document.querySelector('form')
//   var player = document.querySelector('.player').selectedIndex
//   let playerObject = {
//     player: player,
//     game: [game]
//   }
//   postPlayerForm(playerObject)
//   console.log(playerObject)
// })

function postGameForm(gameObject) {
  var fs = require('games.json')

  fs.readFile('./games.json', 'utf-8', function(err, data) {
    if (err) throw err

    var gameObject = JSON.parse(data)

    console.log(gameObject)

    fs.writeFile('./games.json', JSON.stringify(gameObject), 'utf-8', function(err) {
      if (err) throw err
      console.log('Done!')
    })
  })
}

// function postGameForm(gameObject) {
//   fetch('./games.json', {
//     method: 'POST',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(gameObject)
//   })
//     .then(resp => resp.json())
//     .then(resp => displayMessage(resp.message))
//   console.log(gameObject)
// }
//
// function postPlayerForm(object) {
//   fetch('players.json', {
//     method: 'POST',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     body: JSON.stringify(playerObject)
//   })
//     .then(resp => resp.json())
//     .then(resp => displayMessage(resp.message))
// }
