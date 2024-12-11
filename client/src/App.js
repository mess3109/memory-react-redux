import React from 'react';
import './styles/App.css';
import Game from './containers/Game';
import Scores from './containers/Scores';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Images from './containers/Images';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<Game />} />
				<Route path="/scores" element={<Scores />} />
				<Route path="/images" element={<Images />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;