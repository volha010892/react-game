import React from 'react';

export default function Image({ src, alt = '', style = {}, id, className = '', ...props }) {
  return (
    <div style={{objectFit:'contain'}}>
      <img src={src} alt={alt} style={style} className={className} {...props} />
    </div>
  );
}
