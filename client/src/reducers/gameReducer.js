let cards = []
let backupImages = ['https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/nYda7YCiY06VYGVRvfgc4A/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/YlIcfcosMKSItnQxsXpW6w/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/cM62_1h4Szq9gFkLWti3og/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/tAEiY881HVs_33crt6Swng/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/mdk-UfAfmfx3axsi9IGBcg/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/ldMX40edBZskPD-KF9015w/medium.jpg', 'https://d32dm0rphc51dk.cloudfront.net/i4Dkd3mp60XpKwoplsEUGA/medium.jpg','https://d32dm0rphc51dk.cloudfront.net/z2fgbNgHsEsrUTe0dR4g6g/medium.jpg','https://d32dm0rphc51dk.cloudfront.net/AeHNi1Yc3GZ9gET1vlxGxg/medium.jpg']


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
  cards: cards,
  flippedCards: [],
  counter: 0,
  scores: [],
  name: "",
  disableClick: false
};

let cardsOrig = []

export default function game(state = initialState, action) {

  switch(action.type) {

    case 'START':

    if (action.payload.length > 0) {
      cardsOrig = action.payload.map(image => image._links.thumbnail.href )
      while(cardsOrig.length < 10) {
        let num = Math.floor(Math.random() * backupImages.length)
        if (!cardsOrig.find(image => image === backupImages[num])) {
          cardsOrig.push(backupImages[num])
        }
      }
    } else {
      cardsOrig = backupImages
    }

    // test on only two cards
    // cardsOrig = cardsOrig.slice(0,2)
    let images = shuffle(cardsOrig.concat(cardsOrig))

    for (let i = 0; i < images.length; i++) {
      cards[i] = {
        id: i, 
        image: images[i],
        isFlipped: false
      }
    }
    return Object.assign({}, initialState, { cards: cards }, { flippedCards: [] });

    case 'FLIP_CARD':
    let tempState = Object.assign({},{ counter: state.counter, cards: state.cards, flippedCards: state.flippedCards, disableClick: state.disableClick })

    tempState.cards[action.payload].isFlipped = true

    if ((tempState.flippedCards.length === 0 || tempState.flippedCards[0].id !== action.payload) && tempState.flippedCards.length < 2) {
      tempState.flippedCards.push(tempState.cards[action.payload])
    }
    if (tempState.flippedCards.length === 2) {
      tempState.counter++
      tempState.disableClick = true
    } 

    return Object.assign({}, state, tempState );

    case 'CHECK_MATCH_FULFILLED':
    let gameOver
    tempState = Object.assign({}, { cards: state.cards })

    if (state.flippedCards[0].image !== state.flippedCards[1].image) {
      tempState.cards.filter((card) => { return card.id === state.flippedCards[0].id || card.id === state.flippedCards[1].id } ).map( (card) => { return card.isFlipped = false })
    }

    let checkGameOver = tempState.cards.find((card) => {return card.isFlipped === false} )

    if (!checkGameOver) {
      gameOver = !state.gameOver
      alert(`Finished in ${state.counter} rounds!! Add your name to the list of high scores!`)
    }
    
    return Object.assign({}, state, tempState, { flippedCards: [], gameOver: gameOver, disableClick: false });

    case 'END_GAME':

    return Object.assign({}, state, { gameOver: false } )

    default:

    return state;
  }
}