import React, { Component } from 'react'
import Cards from '../components/Cards'
import Name from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, gameOver } from '../actions/gameActions';
import { fetchImages } from '../actions/imageActions';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flippedCards: [],
      counter: 0,
      name: "",
      disableClick: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.gameOver(this.props.game.counter, this.state.name, this.props.history)
    this.setState({ name: "" })
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  };

  componentWillMount() {
    this.props.fetchImages("paul-cezanne")
  }

  startGame = () => {
    this.props.start(this.props.image.images)
  }

  componentDidUpdate() {
    if (this.props.game.flippedCards.length === 2) {
      this.props.checkMatch()
    }
  }

  componentWillUnmount() {
  }

  render() {
   const { game, flipCard } = this.props;
   let form = ""
   if (this.props.game.gameOver) {
    form = <Name handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} gameOver={this.props.game.gameOver} name={this.state.name}/>
  }

  return (
  <div className="game">
    <div><button onClick={() => { game.flippedCards.length !== 2 ? this.startGame() : "" } }>Start New Game</button></div>
    <div className="turn-count">Round: {this.props.game.counter}</div>
    {form}
    <Cards cards={game.cards} flipCard={flipCard} loading={game.loading} disableClick={game.disableClick}/>
  </div>
  );
}
}

const mapStateToProps = (state) => ({ 
  game: state.game,
  image: state.image
});

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({  
    start: start,
    flipCard: flipCard,
    checkMatch: checkMatch,
    gameOver: gameOver,
    fetchImages: fetchImages
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
