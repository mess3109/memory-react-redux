import React from 'react'

const Artist = (props) => {

	const { artist } = props;

	return (
		<div className="artist" onClick={() => { props.selectArtist(artist.slug)} }>{artist.name}
		</div>
		)
}


export default Artist