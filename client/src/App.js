import React from 'react';
import './styles/App.css';
import Game from './containers/Game';
import Scores from './containers/Scores';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Images from './containers/Images';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

	return (
		<div>
			<Router>
				<div>
					<NavBar />
					<Route exact path="/" component={Game} />
					<Route exact path="/scores" component={Scores} />
					<Route exact path="/images" component={Images} />
					<Footer />
				</div>
			</Router >
		</div >
	);
}

export default App;