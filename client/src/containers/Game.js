import React, { Component } from 'react'
import Cards from '../components/Cards.js'
import Name from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, endGame } from '../actions/game';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      cards: [],
      flippedCards: [],
      counter: 0,
      timer: 0,
      name: ""
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
    timer: this.state.timer + 1}, () => {this.gameOver()})
}

startInterval = () => {
  this.interval = setInterval(this.updateTimer, 1000);
}

cleanUpInterval = () => {
  clearInterval(this.interval);
}

gameOver() {
  const timer = this.state.timer
  let check = this.props.game.cards.find((card) => {return card.isFlipped === false}  )
  if (!check) {
    this.props.endGame(timer, this.state.name)
  }
}

winGame() {
  this.props.game.cards.map((card) => {return card.isFlipped = true})
}


render() {
 const { game, flipCard } = this.props;

 return (
  <div>
  <button onClick={() => this.startGame()}>Start New Game</button>
  <button onClick={() => this.winGame()}>Win Game</button>
  <p>Turn Count: {game.counter}</p>
  <p>Timer: {this.state.timer}</p>
  <Cards cards={game.cards} flipCard={flipCard} />
  <Name store={this.props.store} />
  {this.state.name}
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
    checkMatch: checkMatch,
    endGame: endGame
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
