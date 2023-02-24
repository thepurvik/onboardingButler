import React from 'react';

export default function Loader({ file }) {
  return (
    <div className='Loader_Container '>
      <div className='load'></div>
      {file && <p className='poppins-regular pt-4'>Please Wait, File Import In Process</p>}
    </div>
  );
}
