import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const SinglePostSkeleton = ({ simple }) => {
  const renderSkeleton = () => {
    return (
      <article className={`single-post ${simple && 'single-post--simple'}`}>
        <header
          className={`single-post__header ${
            simple && 'single-post__header--simple'
          }`}
        >
          <div className='is-flexed '>
            <SkeletonLoader
              animated
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                marginRight: '1rem',
              }}
            />

            <SkeletonLoader
              animated
              style={{ width: '12rem', height: '1rem' }}
            />
          </div>
        </header>
        <div
          className={`single-post__image ${
            simple && 'single-post__image--simple'
          }`}
        >
          <SkeletonLoader
            animated
            style={{ width: '100%', minHeight: '40rem' }}
          />
        </div>
        <div
          className={`single-post__content ${
            simple && 'single-post__content--simple'
          }`}
        >
          <SkeletonLoader
            style={{
              height: '1rem',
              width: '15rem',
              margin: '1rem',
              borderRadius: '3px',
            }}
          />
          <SkeletonLoader
            style={{
              height: '1rem',
              width: '15rem',
              margin: '1rem',
              borderRadius: '3px',
            }}
          />
          <SkeletonLoader
            style={{
              height: '1rem',
              width: '15rem',
              margin: '1rem',
              borderRadius: '3px',
            }}
          />

          <SkeletonLoader
            style={{
              height: '1rem',
              width: '15rem',
              margin: '1rem',
              borderRadius: '3px',
            }}
          />
          <SkeletonLoader
            style={{
              height: '1rem',
              width: '90%',
              margin: '1rem',
            }}
          />
        </div>
      </article>
    );
  };

  return <>{renderSkeleton()}</>;
};

export default SinglePostSkeleton;
