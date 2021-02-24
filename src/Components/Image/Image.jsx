import React from 'react';
import {ImageContainer} from './Style/Image';
export default function Image({ src, alt = ''}) {
  return (
    <ImageContainer>
      <img src={src} alt={alt} />
    </ImageContainer>
  );
}
