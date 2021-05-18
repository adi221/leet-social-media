import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  SettingsPage,
  UploadPage,
  ProfilePage,
  SinglePostPage,
  ErrorPage,
} from './pages';
import { Navbar, PrivateRoute, RootModal } from './components';

const App = () => {
  const { isShow } = useSelector(state => state.modal);

  return (
    <Router>
      <Navbar />
      <div className='page-container'>
        <Switch>
          <PrivateRoute path='/upload' component={UploadPage} />
          <PrivateRoute path='/profile/:username' component={ProfilePage} />
          <PrivateRoute path='/settings' component={SettingsPage} />
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
      {isShow && <RootModal />}
    </Router>
  );
};

export default App;
