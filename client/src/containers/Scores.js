import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scores } from '../actions/scoreActions';
import Score from '../components/Score.js'

class Scores extends Component {

  componentWillMount() {
    this.props.scores();
  }

  render(){

    const scores = this.props.score.scores.map(score => 

      <Score
      key={score.id}
      id={score.id}
      name={score.name}
      counter={score.counter}
      />
      )

      return (
      <div className="scores">
      <h3>Best Scores</h3>
      {scores}
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      score: state.score
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  
      scores: scores
    }, dispatch)};

    export default connect(mapStateToProps, mapDispatchToProps)(Scores);

