import React from 'react'
import '../styles/Card.css'

const Image = (props) => {

const { image, title, slug, date, location, medium } = props;
const artistArray = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
const artist = artistArray.slice(0, artistArray.length - title.split(" ").length).join(" ")

return (
	<div className="image-block">
		<div className="image-left"><li><img src={image} alt=""/></li></div>
		<div className="image-right">
			<li>{title} by {artist}</li>
			<li>{date}</li>
			<li>{medium}</li>
			<li>Located at {location}</li>
		</div>
	</div>
	)
}

export default Image