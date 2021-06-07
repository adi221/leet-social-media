import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  SettingsPage,
  UploadPage,
  ProfilePage,
  SinglePostPage,
  ErrorPage,
  ChatPage,
} from './pages';
import { Navbar, PrivateRoute, RootModal } from './components';
import { connectSocket } from './actions/socketActions';
import { getNotifications } from './actions/notificationActions';

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { isShow } = useSelector(state => state.modal);

  useEffect(() => {
    if (userInfo) {
      dispatch(connectSocket());
      dispatch(getNotifications());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShow]);

  return (
    <Router>
      <Navbar />
      <div className='page-container'>
        <Switch>
          <PrivateRoute path='/upload' component={UploadPage} />
          <PrivateRoute path='/profile/:username' component={ProfilePage} />
          <PrivateRoute path='/settings' component={SettingsPage} />
          <PrivateRoute path='/direct/inbox' component={ChatPage} />
          <PrivateRoute path='/direct/:chatId' component={ChatPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
          <PrivateRoute
            path='/posts/:username/:id'
            component={SinglePostPage}
          />
          <PrivateRoute path='/' exact component={HomePage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
      <RootModal />
    </Router>
  );
};

export default App;
