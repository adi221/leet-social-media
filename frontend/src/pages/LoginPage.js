import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { login } from '../actions/userActions';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { error, userInfo, loading } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    } else if (error) {
      window.alert(error);
    }
  }, [userInfo, history, error]);

  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password) {
      return window.alert('Please enter email and password');
    }
    dispatch(login(email, password));
  };

  if (loading) return <Loader />;

  return (
    <div className='page login-page '>
      <form className='is-bordered form is-flexed' onSubmit={submitHandler}>
        <h2>Login</h2>
        <input
          className='form-control is-bordered'
          type='text'
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
        <button className='is-primary button width100' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
