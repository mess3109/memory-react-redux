import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from '../components/Image'
import '../styles/Images.css'


class Images extends Component {

  render() {

    const images = this.props.image.images.filter((artwork) => {return typeof artwork._links.thumbnail === "object"}).map((image, index) => 
      <Image image={image._links.thumbnail.href} 
        key={index}
        title={image.title}
        slug={image.slug}
        date={image.date}
        location={image.collecting_institution}
        medium={image.medium}
      />
      )
      return (
      <div className="images">
        <ul>
          {images}
        </ul>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      image: state.image
    }
  }

 export default connect(mapStateToProps)(Images);

