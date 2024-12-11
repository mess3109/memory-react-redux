import React from 'react';
import { useSelector } from 'react-redux';
import Image from '../components/Image'
import '../styles/Images.css'


const Images = () => {
  const images = useSelector(state => state.images.images);

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

export default Images;

