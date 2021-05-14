import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { SearchBar } from '../components';
import logo from '../assets/leet-logo.png';

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const displayList = () => {
    setShowSettings(true);
  };
  const hideList = () => {
    setShowSettings(false);
  };

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='is-flexed'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo' />
          </Link>
          <SearchBar />
        </div>
        <div>
          {isLogged ? (
            <div className='is-flexed'>
              <Link className='button is-primary' to='/upload'>
                Upload
              </Link>
              <button className='button is-light'>Sign out</button>
              <div className='dropdown'>
                <button
                  className='dropdown-toggle is-bordered is-flexed'
                  onMouseOver={displayList}
                >
                  <IoIosArrowDown />
                </button>
                {showSettings && (
                  <ul
                    className='dropdown-content is-bordered '
                    onMouseOver={displayList}
                    onMouseLeave={hideList}
                  >
                    <li className='dropdown-item'>
                      <Link to='/profile'>Profile</Link>
                    </li>
                    <li className='dropdown-item'>
                      <Link to='/settings'>Settings</Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className='is-flexed'>
              <Link to='/signup' className='button is-primary'>
                Sign up
              </Link>
              <Link to='/login' className='button is-light is-bordered'>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
