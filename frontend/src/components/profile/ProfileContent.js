import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import PreviewImage from '../previewImage/PreviewImage';
import UploadButton from '../navbar/UploadButton';

const ProfileContent = ({ list, username, currentProfile = false }) => {
  const history = useHistory();
  const imgHandler = (username, postId) => {
    history.push(`/posts/${username}/${postId}`);
  };

  // TODO: add the same for saved and liked
  if (list.length === 0) {
    return (
      <div className='profile-page__content--empty'>
        <FiCamera />
        {currentProfile ? (
          <>
            <h2>Share Posts</h2>
            <p>When you share photos, they will appear on your profile.</p>
            <UploadButton style={{ width: 'auto', textAlign: 'center' }}>
              <p className='blue bold'>Upload your first photo</p>
            </UploadButton>
          </>
        ) : (
          <>
            <h2>No Posts Yet</h2>
            <p>When {username} posts, you'll see their photos here.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {list &&
        list.map(post => {
          if (post === null) return null;
          const { _id, image, comments, likes } = post;
          return (
            <PreviewImage
              key={_id}
              image={image}
              comments={comments}
              likes={likes}
              onClick={() => imgHandler(username, _id)}
            />
          );
        })}
    </>
  );
};

export default ProfileContent;
