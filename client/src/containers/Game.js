import React, { Component } from 'react'
import Cards from '../components/Cards.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch } from '../actions/game';

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

  startGame = () => {
    this.startInterval();
    this.props.start()
  }

  componentDidUpdate() {
    if (this.props.game.flippedCards.length === 2) {
     setTimeout(() => { this.props.checkMatch(this.props.game.flippedCards, this.props.game.cards)},500)
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
 const { game, flipCard } = this.props;

 return (
  <div>
  <button onClick={() => this.startGame()}>Start New Game</button>
  <p>Turn Count: {game.counter}</p>
  <p>Timer: {this.state.timer}</p>
  <Cards cards={game.cards} flipCard={flipCard} />
  </div>
  );
}
}

const mapStateToProps = (state) => ({ 
  game: state.game
});

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({  
    start: start,
    flipCard: flipCard,
    checkMatch: checkMatch
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
