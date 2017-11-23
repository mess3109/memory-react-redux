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

for (var i = 0; i < 2; i++) {
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
      gameOver: false,
      loading: false,
      cards: cards,
      flippedCards: [],
      counter: 0,
      timer: 0,
      scores: [],
      name: ""
    });

    case 'FLIP_CARD':
    let gameOver = false
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

    case 'CHECK_MATCH_FULFILLED':
    flippedCardsClone = action.payload[1]
    cardsClone = action.payload[0]
    if (action.payload[1][0].image !== action.payload[1][1].image) {
      cardsClone.filter((card) => { return card.id === flippedCardsClone[0].id || card.id === flippedCardsClone[1].id } ).map( (card) => { return card.isFlipped = false })
    }

    let checkGameOver = action.payload[0].find((card) => {return card.isFlipped === false} )
    
    if (!checkGameOver) {
      gameOver = true
    }
    return Object.assign({}, {cards: cardsClone, flippedCards: [], counter: counter, gameOver: gameOver});

    case 'END_GAME':
    return Object.assign({}, state, { flippedCards: [] }, { gameOver: true })

    case 'ADD_NAME':
    return Object.assign({}, state, { name: action.payload });

    default:
    return state;
  }
}