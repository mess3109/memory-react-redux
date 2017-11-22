import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scores } from '../actions/game';

class Scores extends Component {

  componentWillMount() {
    this.props.scores();
    console.log(this.props.game)
  }

  render(){
    return (
      <div>
        <h3>Scores</h3>
          {this.props.game.scores.map((score) => score.timer)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  
    scores: scores
  }, dispatch)};

export default connect(mapStateToProps, mapDispatchToProps)(Scores);

