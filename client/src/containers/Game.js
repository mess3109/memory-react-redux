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
      name: ""
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.name(this.props.game.name)
    this.props.gameOver(this.props.game.counter, this.state.name)
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  };

  startGame = () => {
    this.props.start()
  }

  componentDidUpdate() {
    if (this.props.game.flippedCards.length === 2) {
     this.props.checkMatch(this.props.game.flippedCards, this.props.game.cards)
   }
 }

 componentWillUnmount() {
}

render() {
 const { game, flipCard } = this.props;

 return (
  <div>
  <p><button onClick={() => this.startGame()}>Start New Game</button></p>
  Turn Count: {this.props.game.counter}
  <Cards cards={game.cards} flipCard={flipCard} loading={game.loading}/>
  <p><Name store={this.props.store} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} gameOver={this.props.game.gameOver}/></p>
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
