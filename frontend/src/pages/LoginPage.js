import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { login } from '../actions/userActions';
import loginSvg from '../assets/login.svg';

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
    <div className='page auth-page '>
      <div className='auth-page__container--login'>
        <img className='auth-page__container--img' src={loginSvg} alt='login' />
        <form className='auth-page__container--form' onSubmit={submitHandler}>
          <h2>Login</h2>
          <input
            className='auth-page__container--form-control'
            type='text'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='auth-page__container--form-control'
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
    </div>
  );
};

export default LoginPage;
