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
} from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='page-container'>
        <Switch>
          <Route path='/upload' component={UploadPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/settings' component={SettingsPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/posts/:id' component={SinglePostPage} />
          <Route path='/' exact component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
