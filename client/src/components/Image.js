import React from 'react'
import '../styles/Card.css'

const Image = (props) => {

const { image } = props;

return (
	<div>
		<img src={props.image}/>
	</div>
	)
}


export default Image