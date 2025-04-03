import React from 'react';

const PlaceholderImage = ({ width, height, className }) => {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 ${className || ''}`}
      style={{ 
        width: width || '100%', 
        height: height || '100%',
        minHeight: '200px'
      }}
    />
  );
};

export default PlaceholderImage;