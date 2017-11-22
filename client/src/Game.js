import React, { Component } from 'react'
import Cards from './Cards.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start } from '../src/actions/start';

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


class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flippedCards: [],
      counter: 0,
      timer: 0
    }
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
  // this.setCards();
  // this.setState({
  //   cards: cards,
  //   flippedCards: [],
  //   counter: 0,
  //   timer: 0
  // });
  this.startInterval();
  this.props.start()
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
 const { game } = this.props;

 return (
  <div>
  <button onClick={() => this.startGame()}>Start New Game</button>
  <p>Turn Count: {game.counter}</p>
  <p>Timer: {game.timer}</p>
  <Cards cards={game.cards} flipCard={this.flipCard} />
  </div>
  );
}
}

const mapStateToProps = (state) => ({ 
    game: state.game
  });


const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({  
    start: start
  }, dispatch)

};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
