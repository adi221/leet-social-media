import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UploadPreview from '../uploadPost/UploadPreview';
import UploadHeader from '../uploadPost/UploadHeader';
import UploadDetails from '../uploadPost/UploadDetails';
import { POST_CREATE_RESET } from '../../constants/postConstants';
import { createPost } from '../../actions/postActions';
import { closeModal, showAlert } from '../../actions/utilActions';

const UploadPostModal = ({ file }) => {
  // active mode is either preview or details
  const [activeMode, setActiveMode] = useState('preview');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();
  const { success, loading, error } = useSelector(state => state.postCreate);

  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    if (success || error) {
      dispatch(closeModal());
      dispatch({ type: POST_CREATE_RESET });
      history.push('/');
      success && dispatch(showAlert('Successfully uploaded'));
      error &&
        dispatch(showAlert('Could not upload your post. Please try again.'));
    }
  }, [success, dispatch, error, history]);

  useEffect(() => {
    if (image) return;
    getBase64(file)
      .then(result => {
        setImage(result);
      })
      .catch(err => console.log(err));
  }, [file, image]);

  const uploadPostHandler = () => {
    if (!image || !description) return;

    dispatch(createPost(image, description));
  };

  return (
    <div className='modal__upload'>
      <UploadHeader
        activeMode={activeMode}
        changeMode={mode => setActiveMode(mode)}
        uploadPost={uploadPostHandler}
        loading={loading}
      />
      {activeMode === 'preview' ? (
        <UploadPreview previewImage={file} />
      ) : (
        <UploadDetails
          image={image}
          description={description}
          changeDescription={val => setDescription(val)}
        />
      )}
    </div>
  );
};

export default UploadPostModal;
