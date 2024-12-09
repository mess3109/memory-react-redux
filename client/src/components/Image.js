import React from 'react'
import '../styles/Images.css'

const Image = (props) => {

	const { image, title, slug, date, location, medium } = props;
	const artistArray = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	const artist = artistArray.slice(0, artistArray.length - title.split(" ").length).join(" ")

	return (
		<div>
			<div className="image-block">
				<div className="image-left"><li><img src={image} alt="" /></li></div>
				<div className="image-right">
					<li><span className="title">{title}</span><span> by {artist}</span></li>
					<li>{date && (`Date: ${date}`)}</li>
					<li>{medium && (`Medium: ${medium}`)}</li>
					<li>{location && (`Located at ${location}`)}</li>
				</div>
			</div>
		</div>
	)
}

export default Image