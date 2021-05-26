import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { ErrorPage } from '../pages';
import { Loader } from '../components';
import { POST_CREATE_RESET } from '../constants/postConstants';
import { createPost } from '../actions/postActions';

const UploadPage = () => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file..');
  const [base64, setBase64] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();
  const postCreate = useSelector(state => state.postCreate);
  const { loading, success, error } = postCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: POST_CREATE_RESET });
      history.push('/');
    }
  }, [success, dispatch, history]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

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
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

    getBase64(e.target.files[0])
      .then(result => {
        setBase64(result);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = i => {
    const newTags = tags.filter((tag, index) => index !== i);
    setTags(newTags);
  };
  const handleAddition = tag => {
    setTags([...tags, tag]);
  };
  const handleDrag = (tag, curPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(curPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!file || !description) return;
    const updatedTags = tags.map(tag => {
      const { text } = tag;
      return text;
    });
    dispatch(createPost(base64, updatedTags, description));
  };

  return (
    <div className='page upload-page'>
      <form
        className='is-bordered auth-form is-flexed'
        onSubmit={submitHandler}
      >
        <h2>Upload</h2>

        <label htmlFor='uploadFile' className='upload-file'>
          <input
            type='file'
            id='uploadFile'
            onChange={fileHandler}
            accept='image/x-png,image/jpeg'
          />
          <span>{filename} </span>
        </label>

        {file && <img src={URL.createObjectURL(file)} alt='uploaded-file' />}

        <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          delimiters={[188, 13, 32, 9]}
          placeholder='Add a new tag'
        />

        <textarea
          className='form-control is-bordered textarea'
          type='description'
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='is-primary button width100' type='submit'>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
