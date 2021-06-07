import React from 'react';
import { ReactComponent as SvgLoader } from '../../assets/loader.svg';

const LoaderSvg = () => {
  return (
    <div className='loader-container'>
      <SvgLoader className='svg-loader' />
    </div>
  );
};

export default LoaderSvg;
