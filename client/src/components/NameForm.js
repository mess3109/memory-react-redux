import React, { Component } from 'react'
import { name } from '../actions/game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Name extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}
	

	handleSubmit(event) {
		event.preventDefault();
		this.props.name(this.state.name)
	}

	handleChange(event) {
		this.setState({
			name: event.target.value
		});
	};

	render() {
		return (
			<div>
			<form onSubmit={(event) => this.handleSubmit(event)}>
			<label>Name</label>
			<input type="text" onChange={(event) => this.handleChange(event)} value={this.state.name}/>
			<input type="submit" />
			</form>
			</div>
			)
	}
}

const mapStateToProps = (state) => ({ 
  game: state.game
});

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({  
    name: name
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Name);
