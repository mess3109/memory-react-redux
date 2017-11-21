import React, { Component } from 'react'
import Cards from './Cards.js'
// import PropTypes from 'prop-types';

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


export default class Game extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  setCards() {
    for (i = 0; i < images.length; i++) {
      cards[i] = {
        id: i, 
        image: images[i],
        isFlipped: false
      }
    }
  }

//flippedCards and cards are not re-rendering yet
startGame = () => {
  this.setCards();
  this.setState({
    cards: cards,
    flippedCards: [],
    counter: 0,
    timer: 0
  });
  this.startInterval();
}

flipCard = id => {
  let counter = this.state.counter
  let cardsClone = this.state.cards
  cardsClone[id].isFlipped = true
  let flippedCardsClone = this.state.flippedCards
  if ((flippedCardsClone.length === 0 || flippedCardsClone[0].id !== id) && flippedCardsClone.length < 2) {
    flippedCardsClone.push(cardsClone[id])
  }
  if (flippedCardsClone.length === 2) {
    counter++
  }

  this.setState({
    counter: counter,
    cards: cardsClone,
    flippedCards: flippedCardsClone
  }, () => this.checkMatch(flippedCardsClone, cardsClone))

}

checkMatch(flippedCardsClone, cardsClone) {
  if (flippedCardsClone.length === 2) {
    if (flippedCardsClone[0].image === flippedCardsClone[1].image) {
      console.log('match!')
    } else {
      cardsClone.filter((card) => { return card.id === flippedCardsClone[0].id || card.id === flippedCardsClone[1].id } ).map( (card) => { return card.isFlipped = false })
    }

    setTimeout(() => { this.setState({
      cards: cardsClone,
      flippedCards: []
    })}, 750)
  }
}

componentWillUnmount() {
  this.cleanUpInterval()
}

updateTimer = () => {
  this.setState({
    timer: this.state.timer + 1
  })
}

startInterval = () => {
  this.interval = setInterval(this.updateTimer, 1000);
}

cleanUpInterval = () => {
  clearInterval(this.interval);
}


render() {
 return (
  <div>
  <button onClick={() => this.startGame()}>Start New Game</button>
  <p>Turn Count: {this.state.counter}</p>
  <p>Timer: {this.state.timer}</p>
  <Cards cards={this.state.cards} flipCard={this.flipCard} />
  </div>
  );
}
}
