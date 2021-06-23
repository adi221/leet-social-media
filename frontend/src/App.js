import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  SettingsPage,
  ProfilePage,
  SinglePostPage,
  ErrorPage,
  ChatPage,
  ExplorePage,
} from './pages';
import { Navbar, PrivateRoute, RootModal } from './components';
import Alert from './components/alert/Alert';
import { connectSocket } from './actions/socketActions';
import {
  getNotifications,
  getChatNotifications,
} from './actions/notificationActions';

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { isShow } = useSelector(state => state.modal);

  useEffect(() => {
    if (userInfo) {
      dispatch(connectSocket());
      dispatch(getNotifications());
      dispatch(getChatNotifications());
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
          <PrivateRoute path='/profile/:username' component={ProfilePage} />
          <PrivateRoute path='/settings' component={SettingsPage} />
          <PrivateRoute path='/direct/inbox' component={ChatPage} />
          <PrivateRoute path='/direct/:chatId' component={ChatPage} />
          <PrivateRoute path='/explore' component={ExplorePage} />
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
      <Alert />
    </Router>
  );
};

export default App;
