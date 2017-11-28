import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scores } from '../actions/scoreActions';
import Score from '../components/Score'


class Scores extends Component {

  constructor(props) {
    super(props)
    this.state = {
      likeCounter: 0
      }
  }

  componentWillMount() {
    this.props.scores();
  }

  clickMe() {
    console.log(this)
    this.setState({
      likeCounter: this.state.likeCounter + 1
    }) 
  }

  render(){

    const scores = this.props.score.scores.map(score => 

      <Score
      key={score.id}
      id={score.id}
      name={score.name}
      counter={score.counter}
      time={score.created_at}
      clickMe={this.clickMe.bind(this)}
      likeCounter={this.state.likeCounter}
      />
      )

      return (
      <div className="scores">
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

