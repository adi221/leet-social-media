import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const UsersListSkeleton = ({ amount = 3, style }) => {
  const renderSkeleton = () => {
    const skeleton = [];
    for (let i = 0; i < amount; i++) {
      skeleton.push(
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.4rem ',
            ...style,
          }}
        >
          <SkeletonLoader
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '100px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SkeletonLoader
              style={{
                width: '6.5rem',
                height: '0.75rem',
                marginLeft: '1rem',
                marginBottom: '5px',
              }}
            />
            <SkeletonLoader
              style={{ width: '10rem', height: '0.75rem', marginLeft: '1rem' }}
            />
          </div>
        </div>
      );
    }
    return skeleton;
  };

  return <>{renderSkeleton()}</>;
};

export default UsersListSkeleton;
