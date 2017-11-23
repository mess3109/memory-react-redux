import React, { Component } from 'react'
import Cards from '../components/Cards.js'
import Name from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, gameOver, name } from '../actions/gameActions';

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
    this.props.gameOver(this.state.timer, this.state.name)
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
     this.props.checkMatch(this.props.game.flippedCards, this.props.game.cards)
   }
 }

 componentWillUnmount() {
  this.cleanUpInterval()
}

updateTimer = () => {
  this.setState({
    timer: this.state.timer + 1})
}

startInterval = () => {
  this.interval = setInterval(this.updateTimer, 1000);
}

cleanUpInterval = () => {
  clearInterval(this.interval);
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
  <p>Turn Count: {this.props.game.counter}</p>
  <p>Timer: {this.state.timer}</p>  
  <Name store={this.props.store} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} gameOver={this.props.game.gameOver}/>
  <Cards cards={game.cards} flipCard={flipCard} loading={game.loading}/>
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
