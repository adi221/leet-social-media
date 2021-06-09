import React from 'react';
import { ReactComponent as SvgLoader } from '../../assets/loader.svg';

const LoaderSvg = () => {
  return (
    <div
      className='loader-container'
      style={{ backgroundColor: 'rgba(240,255,255,0.1)' }}
    >
      <SvgLoader className='svg-loader' />
    </div>
  );
};

export default LoaderSvg;
