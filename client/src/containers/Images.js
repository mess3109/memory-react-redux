import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from '../components/Image'
import '../styles/Images.css'


class Images extends Component {
  render() {
    const images = this.props.images.images.map((image, index) =>
      <Image image={image.url}
        key={index}
        title={image.title}
        slug={image.slug}
        date={image.date}
        location={image.location}
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
    images: state.images
  }
}

export default connect(mapStateToProps)(Images);

