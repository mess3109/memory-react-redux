import React from 'react'
import '../styles/Card.css'

const Image = (props) => {

	const { image, title, slug, date, location, medium } = props;

	const artistArray = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	const artist = artistArray.slice(0, artistArray.length - title.split(" ").length).join(" ")

	return (
		<div className="image-block">
		<li><img src={image} alt=""/></li>
		<li>{title}</li>
		<li>{medium}</li>
		<li>By {artist}</li>
		<li>Created: {date}</li>
		<li>Current Location: {location}</li>
		{'\n'}
		</div>
		)
	}

	export default Image