import React from 'react'

const Artists = (props) => {

	return (
		<form value={props.artistSlug} onSubmit={props.handleArtistSubmit}>
			<label>
				<select onChange={props.handleArtistChange}>
					<option hidden disabled selected value> -- pick an artist -- </option>
					{props.artists.map(artist => {
						return <option value={artist.slug} key={artist.slug}>{artist.name}</option>
					})}
				</select>
			</label>
			<button>Start New Game</button>
		</form>
	);
}

export default Artists;

