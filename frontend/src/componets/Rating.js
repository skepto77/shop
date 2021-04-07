import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({value, text, color}) => {
  return (
    <>
      <i style={{color}}
        className={
        value >=1 
          ? "bi bi bi-star-fill" 
          : value >=0.5 
          ? "bi bi-star-half" 
          : "bi bi-star" 
        }>
      </i>
      <i style={{color: color}}
        className={
        value >=2 
          ? "bi bi bi-star-fill" 
          : value >=1.5 
          ? "bi bi-star-half" 
          : "bi bi-star" 
        }>
      </i>
      <i style={{color: color}}
        className={
        value >=3 
          ? "bi bi bi-star-fill" 
          : value >=2.5 
          ? "bi bi-star-half" 
          : "bi bi-star" 
        }>
      </i>
      <i style={{color: color}}
        className={
        value >=4 
          ? "bi bi bi-star-fill" 
          : value >=3.5 
          ? "bi bi-star-half" 
          : "bi bi-star" 
        }>
      </i>
      <i style={{color: color}}
        className={
        value >=5 
          ? "bi bi bi-star-fill" 
          : value >=4.5 
          ? "bi bi-star-half" 
          : "bi bi-star" 
        }>
      </i>
      <span>{text && text}</span>
    </>
  )
};

Rating.defaultProps = {
  color: '#FFAE42',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}
export default Rating;