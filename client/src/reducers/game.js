let cardsOrig = []
let cards = []

function shuffle(array) {
  let temp = null
  let j = 0

  for (var i = 0; i < array.length; i++) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

for (var i = 0; i < 8; i++) {
  cardsOrig[i] = i + 1
}

let images = shuffle(cardsOrig.concat(cardsOrig))

const initialState = {
  cards: [],
  flippedCards: [],
  counter: 0,
  timer: 0,
  scores: [],
  loading: false,
  endGame: false
};

for (i = 0; i < images.length; i++) {
  cards[i] = {
    id: i, 
    image: images[i],
    isFlipped: false
  }
}

export default function game(state = initialState, action) {
  switch(action.type) {
    case 'START':
    return ({
      endGame: false,
      loading: false,
      cards: cards,
      flippedCards: [],
      counter: 0,
      timer: 0,
      scores: []
    });

    case 'FLIP_CARD':
    let counter = state.counter
    let cardsClone = state.cards
    cardsClone[action.id].isFlipped = true
    let flippedCardsClone = state.flippedCards
    if ((flippedCardsClone.length === 0 || flippedCardsClone[0].id !== action.id) && flippedCardsClone.length < 2) {
      flippedCardsClone.push(cardsClone[action.id])
    }
    if (flippedCardsClone.length === 2) {
      counter++
    } 
    return Object.assign({}, {cards: cardsClone, flippedCards: flippedCardsClone, counter: counter});

    case 'CHECK_MATCH':
    flippedCardsClone = action.flippedCards
    cardsClone = action.cards
    if (flippedCardsClone[0].image === flippedCardsClone[1].image) {
      console.log('match!')
    } else {
      cardsClone.filter((card) => { return card.id === flippedCardsClone[0].id || card.id === flippedCardsClone[1].id } ).map( (card) => { return card.isFlipped = false })
    }
    return Object.assign({}, {cards: cardsClone, flippedCards: [], counter: counter});

    case 'GET_SCORES':
    return Object.assign({}, state, { loading: true }) 

    case 'SHOW_SCORES':
    return {loading: false, scores: action.payload}

    case 'END_GAME':
    return Object.assign({}, state, { endGame: true })

    default:
    return state;
  }
}