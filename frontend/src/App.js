import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { Navbar } from './components';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='page-container'>
        <Switch>
          <Route path='/upload' component={UploadPage} />
          <Route path='/profile/:username' component={ProfilePage} />
          <Route path='/settings' component={SettingsPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/posts/:username/:id' component={SinglePostPage} />
          <Route path='/' exact component={HomePage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
