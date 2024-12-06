import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scores } from '../actions/scoreActions';
import Score from '../components/Score'
import '../styles/Scores.css'


class Scores extends Component {

  componentWillMount() {
    this.props.scores();
  }

  render() {

    const scores = this.props.score.scores.map(score =>
      <Score
        key={score.id}
        id={score.id}
        name={score.name}
        counter={score.total}
        date={score.createdAt}
      />
    )

    return (
      <div className="scores">
        <div className="score-container"><span className="date"><h3>Date</h3></span><span className="name"><h3>Name</h3></span><span className="score"><h3>Rounds</h3></span></div>
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
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Scores);

