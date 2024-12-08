import React from 'react'

const Artists = (props) => {

	const artists = props.artists.map(artist => {
		return <option value={artist.slug} key={artist.slug}>{artist.name}</option>
	})

	return (
		<form value={props.artistSlug} onSubmit={props.handleArtistSubmit}>
			<label>
				<select onChange={props.handleArtistChange}>
					<option hidden disabled selected value> -- pick an artist -- </option>
					{artists}
				</select>
			</label>
			<button>Start New Game</button>
		</form>
	);
}

export default Artists;

