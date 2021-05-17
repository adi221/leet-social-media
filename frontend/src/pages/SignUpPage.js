import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { register } from '../actions/userActions';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { error, loading } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    } else if (error) {
      window.alert(error);
    }
  }, [userInfo, history, error]);

  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password || !username || !passwordConfirm || !name) {
      return window.alert('Please enter email and password');
    }
    if (password !== passwordConfirm) {
      return window.alert('Password and password confirmation do not match ');
    }
    dispatch(register(username, name, email, password));
  };

  if (loading) return <Loader />;

  return (
    <div className='page signup-page '>
      <form className='is-bordered form is-flexed' onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <input
          className='form-control is-bordered'
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className='form-control is-bordered'
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className='form-control is-bordered'
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className='form-control is-bordered'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className='form-control is-bordered'
          type='password'
          placeholder='Confirm Password'
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button className='is-primary button width100' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
