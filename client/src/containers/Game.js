import React, { Component } from 'react'
import Artists from '../components/Artists'
import Cards from '../components/Cards'
import NameForm from '../components/NameForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { start, flipCard, checkMatch, gameOver } from '../actions/gameActions';
import { fetchImages } from '../actions/imageActions';


const artists = [
{"name": "Leonardo da Vinci", "slug": "leonardo-da-vinci"},
{"name": "Mary Cassatt", "slug": "mary-cassatt"},
{"name": "Pierre Auguste Renoir", "slug": "pierre-auguste-renoir"},
]

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artistSlug: "",
      cards: [],
      flippedCards: [],
      counter: 0,
      name: "",
      disableClick: false,
      loading: true
    }
  }

  handleArtistChange(event) {
    this.props.fetchImages(event.target.value)
  }

  handleArtistSubmit(event) {
    event.preventDefault();
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

  startGame = () => {
    this.props.start(this.props.image.images)
  }

  componentDidUpdate() {
    if (this.props.game.flippedCards.length === 2) {
      this.props.checkMatch()
    }
  }

  render() {

   const { game, flipCard } = this.props;

   const form = this.props.game.gameOver ? <NameForm handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} gameOver={this.props.game.gameOver} name={this.state.name}/> : ""

   return (
    <div className="game">
    {form}
    <Artists artists={artists} 
    selectArtist={this.props.fetchImages} 
    handleArtistChange={this.handleArtistChange.bind(this)} 
    handleArtistSubmit={this.handleArtistSubmit.bind(this)}
    flippedCards={game.flippedCards}
    startGame={this.startGame}
    />
    <div className="turn-count">Round: {this.props.game.counter}</div>

    <Cards cards={game.cards} flipCard={flipCard} disableClick={game.disableClick}/>
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
