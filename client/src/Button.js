import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {

render() {
	return (
      <div className="Button" onClick={this.props.handleStartNewGame}>
        Start new game!
      </div>
    );
	}
}

  
  Button.propTypes = {
    handleStartNewGame: React.PropTypes.func
  }

