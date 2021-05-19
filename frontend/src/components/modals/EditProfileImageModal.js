import React from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { updateUserProfile } from '../../actions/userActions';

const defaultImage =
  'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png';

const EditImageModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const removeHandler = () => {
    dispatch(updateUserProfile({ image: defaultImage }));
  };

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

  const fileHandler = e => {
    e.preventDefault();

    getBase64(e.target.files[0])
      .then(result => dispatch(updateUserProfile({ image: result })))
      .then(() => closeModal())
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2>Change Profile Photo</h2>
      <ul>
        <li className='blue bold'>
          <label htmlFor='file'>
            <input
              type='file'
              id='file'
              onChange={fileHandler}
              accept='image/x-png,image/jpeg'
            />
            Upload Photo
          </label>
        </li>
        <li>
          <button className='red bold' onClick={removeHandler}>
            Remove Current Photo
          </button>
        </li>
        <li>
          <button onClick={closeModal}> Cancel</button>
        </li>
      </ul>
    </>
  );
};

export default EditImageModal;
