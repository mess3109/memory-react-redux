// let cardsOrig = []
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

const initialState = {
  gameOver: false,
  loading: true,
  cards: cards,
  flippedCards: [],
  counter: 0,
  scores: [],
  name: ""
};

export default function game(state = initialState, action) {
  switch(action.type) {
    case 'START':
    let cardsOrig = action.payload.map((image) => { return image._links.thumbnail.href })
    let images = shuffle(cardsOrig.concat(cardsOrig))

    for (let i = 0; i < images.length; i++) {
      cards[i] = {
        id: i, 
        image: images[i],
        isFlipped: false
      }
    }
    return Object.assign({}, initialState, { cards: cards });

    case 'FLIP_CARD':
    let tempState = Object.assign({},{ counter: state.counter, cards: state.cards, flippedCards: state.flippedCards })

    tempState.cards[action.payload].isFlipped = true

    if ((tempState.flippedCards.length === 0 || tempState.flippedCards[0].id !== action.payload) && tempState.flippedCards.length < 2) {
      tempState.flippedCards.push(tempState.cards[action.payload])
    }
    if (tempState.flippedCards.length === 2) {
      tempState.counter++
    } 

    return Object.assign({}, state, tempState );

    case 'CHECK_MATCH_FULFILLED':
    let gameOver = false
    let flippedCardsClone = action.payload[1]
    let cardsClone = action.payload[0]
    if (action.payload[1][0].image !== action.payload[1][1].image) {
      cardsClone.filter((card) => { return card.id === flippedCardsClone[0].id || card.id === flippedCardsClone[1].id } ).map( (card) => { return card.isFlipped = false })
    }

    let checkGameOver = action.payload[0].find((card) => {return card.isFlipped === false} )
    
    if (!checkGameOver) {
      gameOver = true
    }
    return Object.assign({}, state, {cards: cardsClone, flippedCards: [], gameOver: gameOver});

    case 'END_GAME':
    return Object.assign({}, state, { flippedCards: [] }, { gameOver: true }, { loading: false })

    case 'ADD_NAME':
    return Object.assign({}, state, { name: action.payload });

    default:
    return state;
  }
}