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
  endGame: false,
  name: ""
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
      scores: [],
      name: ""
    });

    case 'FLIP_CARD':
    let counter = state.counter
    let cardsClone = state.cards
    cardsClone[action.payload].isFlipped = true
    let flippedCardsClone = state.flippedCards
    if ((flippedCardsClone.length === 0 || flippedCardsClone[0].id !== action.payload) && flippedCardsClone.length < 2) {
      flippedCardsClone.push(cardsClone[action.payload])
    }
    if (flippedCardsClone.length === 2) {
      counter++
    } 
    return Object.assign({}, {cards: cardsClone, flippedCards: flippedCardsClone, counter: counter});

    case 'CHECK_MATCH':
    flippedCardsClone = action.payload.flippedCards
    cardsClone = action.payload.cards
    if (flippedCardsClone[0].image === flippedCardsClone[1].image) {
      console.log('match!')
    } else {
      cardsClone.filter((card) => { return card.id === flippedCardsClone[0].id || card.id === flippedCardsClone[1].id } ).map( (card) => { return card.isFlipped = false })
    }
    return Object.assign({}, {cards: cardsClone, flippedCards: [], counter: counter});

    case 'END_GAME':
    return Object.assign({}, state, { gameOver: true })

    case 'ADD_NAME':
    return Object.assign({}, state, { name: action.payload });

    default:
    return state;
  }
}