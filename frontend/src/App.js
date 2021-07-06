import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, PrivateRoute, RootModal, Loader } from './components';
import Alert from './components/alert/Alert';
import { connectSocket, disconnectSocket } from './actions/socketActions';
import {
  getNotifications,
  getChatNotifications,
} from './actions/notificationActions';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SinglePostPage = lazy(() => import('./pages/SinglePostPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));

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

    return () => dispatch(disconnectSocket());
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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default App;
