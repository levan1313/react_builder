import React from 'react';
import { BannerElement } from './ElementTypes';

interface BannerProps {
  element: BannerElement;
}

const Banner: React.FC<BannerProps> = ({ element }) => {
  return (
    <div
      style={{
        backgroundColor: element.backgroundColor || '#fff',
        border: '1px solid black',
        padding: '10px',
        margin: '5px 0',
        textAlign: 'center',
      }}
    >
      {element.imageUrl && <img src={element.imageUrl} alt="Banner" style={{ maxWidth: '100%' }} />}
      <p>{element.text}</p>
    </div>
  );
};

export default Banner;
