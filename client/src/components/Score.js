// import React from 'react'

// const Score = (props) => {
import React, { Component } from 'react';

class Score extends Component {

	constructor(props) {
		super(props)
		this.state = {
			likeCounter: 0
		}
	}

	clickMe = () => {
		console.log(this)
		this.setState({
			likeCounter: this.state.likeCounter + 1
		}) 
	}

	callApi = () => {
		console.log('a')
		fetch('/api/games') 
		.then(response => {
			console.log('b')
			return response.json()
		})
		.then(data => console.log('c', data))
		console.log('d')
	}

		render() {
	// const { name, counter, time } = props;
	return (
		<div>{this.props.name}: {this.props.counter}
		<button onClick={this.clickMe}>Like</button>: {this.state.likeCounter}
		<button onClick={this.callApi}>Call Api</button>
		</div>
		)
	}
}

export default Score