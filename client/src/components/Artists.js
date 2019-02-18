import React from 'react'

const Artists = (props) => {

	const artists = props.artists.map(artist => { 
		return <option value={artist.slug} key={artist.slug}>{artist.name}</option>
	})

	return (
	<form onSubmit={props.handleArtistSubmit}>
	<label>
	Pick an artist: 
	<select value={props.artistSlug} onChange={props.handleArtistChange}>
	{artists}
	</select>
	</label>
	<button onClick={() => { props.flippedCards.length !== 2 ? props.startGame() : "" } }>Start New Game</button>
	</form>
	);
}

export default Artists;

