import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSettings, IoIosPerson } from 'react-icons/io';
import { SearchBar } from '../../components';
import logo from '../../assets/leet-logo.png';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const displayList = () => {
    setShowSettings(true);
  };
  const hideList = () => {
    setShowSettings(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  useEffect(() => {
    document.addEventListener('click', () => {
      setShowSettings(false);
    });
  });

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
          {userInfo ? (
            <div className='is-flexed'>
              <Link className='button is-primary' to='/upload'>
                Upload
              </Link>
              <button className='button is-light ' onClick={logoutHandler}>
                Sign out
              </button>
              <div className='dropdown'>
                <button
                  className='dropdown-toggle is-flexed'
                  onMouseOver={displayList}
                >
                  <img src={userInfo.profileImage} alt={userInfo.username} />
                </button>
                {showSettings && (
                  <ul
                    className='dropdown-content  '
                    onMouseOver={displayList}
                    onMouseLeave={hideList}
                  >
                    <li className='dropdown-item '>
                      <Link to={`/profile/${userInfo._id}`}>
                        {' '}
                        <IoIosPerson /> Profile
                      </Link>
                    </li>
                    <li className='dropdown-item '>
                      <Link to='/settings'>
                        {' '}
                        <IoIosSettings /> Settings
                      </Link>
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