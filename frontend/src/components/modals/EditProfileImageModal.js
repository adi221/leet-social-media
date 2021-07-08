import React from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { closeModal } from '../../actions/utilActions';
import { updateUserProfile } from '../../actions/userActions';
import { showAlert } from '../../actions/utilActions';

/**
 * Functional react component for options of a single comment / reply
 * @function EditImageModal
 * @returns {JSX.Element} - Rendered component
 */

// If user deletes current photo
const defaultImage =
  'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png';

const EditImageModal = () => {
  const dispatch = useDispatch();

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
      .then(() => dispatch(closeModal()))
      .catch(err => {
        dispatch(closeModal());
        dispatch(showAlert('Could not update image profile'));
      });
  };

  return (
    <>
      <div className='modal__title'>
        <h2>Change Profile Photo</h2>
        <button onClick={() => dispatch(closeModal())}>
          <GrClose />
        </button>
      </div>
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
          <button onClick={() => dispatch(closeModal())}> Cancel</button>
        </li>
      </ul>
    </>
  );
};

export default EditImageModal;
