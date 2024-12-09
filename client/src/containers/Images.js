import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from '../components/Image'
import '../styles/Images.css'


class Images extends Component {
  render() {
    const { images } = this.props.images;

    return (
      <div>
        <div className="images">
          <ul>
            {images.map((image, index) =>
              <Image image={image.url}
                key={index.artsyId}
                title={image.title}
                slug={image.slug}
                date={image.date}
                location={image.location}
                medium={image.medium}
              />
            )}
          </ul>
        </div>
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

