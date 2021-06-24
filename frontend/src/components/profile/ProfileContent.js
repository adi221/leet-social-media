import React from 'react';
import { useHistory } from 'react-router-dom';
import PreviewImage from '../previewImage/PreviewImage';

const ProfileContent = ({ list, username }) => {
  const history = useHistory();
  const imgHandler = (username, id) => {
    history.push(`/posts/${username}/${id}`);
  };

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
