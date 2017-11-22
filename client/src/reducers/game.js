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
  timer: 0
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
      cards: cards,
      flippedCards: [],
      counter: 0,
      timer: 0
    });
    default:
    return state;
  }
}