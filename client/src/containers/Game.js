import React, { Component } from 'react'
import Cards from '../components/Cards'
import Name from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, gameOver, name } from '../actions/gameActions';
import { fetchImages } from '../actions/imageActions';

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
    this.setState({ name: "" })
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  };

  componentWillMount() {
    this.props.fetchImages('https://api.artsy.net/api/artworks?similar_to_artwork_id=516ca69f078b3214780007a9');
  }

  startGame = () => {
    this.props.start(this.props.image.images)
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
    <div className="game">
    <div><button onClick={() => this.startGame()}>Start New Game</button></div>
    <div className="turn-count">Turn Count: {this.props.game.counter}</div>
    <Cards cards={game.cards} flipCard={flipCard} loading={game.loading}/>
    <Name handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} gameOver={this.props.game.gameOver} name={this.state.name}/>
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
    name: name,
    fetchImages: fetchImages
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
