import React from 'react';

export const CustomCarousel = ({ data = [] }) => {
  return (
    <>
      {data && (
        <div id='carouselExampleCaptions' className='carousel slide w-100' data-ride='carousel' data-interval='false'>
          <ol className='carousel-indicators'>
            {data.map((content, i) => (
              <li data-target='#carouselExampleCaptions' key={i} data-slide-to={i} className={i == 0 ? 'active' : ''}></li>
            ))}
          </ol>
          <div className='carousel-inner'>
            {data.map((content, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                {content}
              </div>
            ))}
          </div>
          <a className='carousel-control-prev' href='#carouselExampleCaptions' role='button' data-slide='prev'>
            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
            <span className='sr-only'>Previous</span>
          </a>
          <a className='carousel-control-next' href='#carouselExampleCaptions' role='button' data-slide='next'>
            <span className='carousel-control-next-icon' aria-hidden='true'></span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      )}
    </>
  );
};
