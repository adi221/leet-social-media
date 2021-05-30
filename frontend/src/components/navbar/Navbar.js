import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSettings, IoIosPerson } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';
import { SearchBar, NotificationButton } from '../../components';
import logo from '../../assets/leet-logo.png';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  useEffect(() => {
    document.addEventListener('click', e => {
      // console.log(e.target);
      if (e.target.classList.contains('drop')) return;
      setShowSettings(false);
    });
  });

  return (
    <nav className='nav'>
      <div className='nav__center'>
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
              <NotificationButton />
              {/* <div className='drop nav__center--dropdown'>
                <button
                  className='drop is-flexed'
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  {showNotifications ? (
                    <FaHeart
                      className='drop nav__center--dropdown-notification'
                      style={{ fill: '#262626' }}
                    />
                  ) : (
                    <FaRegHeart className='drop nav__center--dropdown-notification' />
                  )}
                </button>
                {showNotifications && <Notifications />}
              </div> */}

              <div className='drop nav__center--dropdown'>
                <button
                  className='drop  is-flexed'
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <img
                    className={`drop nav__center--dropdown__image ${
                      showSettings && 'clicked'
                    }`}
                    src={userInfo.profileImage}
                    alt={userInfo.username}
                  />
                </button>
                {showSettings && (
                  <ul className='drop nav__center--dropdown-content'>
                    <li className='drop'>
                      <Link to={`/profile/${userInfo._id}`}>
                        <IoIosPerson /> Profile
                      </Link>
                    </li>
                    <li className='drop'>
                      <Link to='/settings'>
                        <IoIosSettings /> Settings
                      </Link>
                    </li>
                    <li className='drop'>
                      <button onClick={logoutHandler}>
                        <FaSignOutAlt /> Sign Out
                      </button>
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
