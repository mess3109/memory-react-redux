import React, { Component } from 'react'
import Cards from '../components/Cards.js'
import Name from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, gameOver, name } from '../actions/game';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flippedCards: [],
      counter: 0,
      timer: 0,
      name: ""
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.name(this.props.game.name)
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  };

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
  <p>Turn Count: {this.state.counter}</p>
  <p>Timer: {this.state.timer}</p>  
  <Name store={this.props.store} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} endGame={this.props.game.endGame}/>
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
    checkMatch: checkMatch,
    gameOver: gameOver,
    name: name
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
