import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchImages, afterToken } from '../actions/imageActions';
import Image from '../components/Image.js'
import '../styles/Images.css'


class Images extends Component {

  componentWillMount() {
    this.props.fetchImages('https://api.artsy.net/api/artworks?similar_to_artwork_id=516ca69f078b3214780007a9')
  }

  render() {

    const images = this.props.image.images.map((image, index) => 
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
        <div className="footer">This application uses the <a href="developers.artsy.net">Artsy API</a> but is not endorsed or certified by Artsy.  This application features images from the <a href="developers.artsy.net">Artsy API</a>.</div>
 
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      image: state.image
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  
      fetchImages: fetchImages,
      afterToken: afterToken
    }, dispatch)};

    export default connect(mapStateToProps, mapDispatchToProps)(Images);

