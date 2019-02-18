import React from 'react'
import Artist from './Artist'

const Artists = (props) => {

	const artists = props.artists.map(artist => 
		<Artist 
		key={artist.slug}
		slug={artist.slug}
		name={artist.name}
		selectArtist={props.selectArtist}
		/>
		)

	return (
		<div className="artistsContainer">
		<div className="artist">
		{artists}
		</div>
		</div>
		);

}

export default Artists;
