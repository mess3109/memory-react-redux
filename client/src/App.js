import React, { Component } from 'react';
import './styles/App.css';
import Game from './containers/Game';
import NavBar from './components/NavBar';
import Scores from './components/Scores';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

	render() {
		return (
			<Router>
			<div>
			<NavBar />
			<Route exact path="/" component={Game} />
			<Route exact path="/scores" component={Scores} />
			</div>
			</Router>
			);
	}
}

