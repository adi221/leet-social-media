import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSettings, IoIosPerson } from 'react-icons/io';
import { RiMessengerLine, RiMessengerFill } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { SearchBar, NotificationButton } from '../../components';
import logo from '../../assets/leet-logo.png';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { pathname } = useLocation();

  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  useEffect(() => {
    document.addEventListener('click', e => {
      if (e.target.closest('nav')) return;
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
              <Link to='/direct' className='nav__center--button is-flexed'>
                {pathname === '/direct' ? (
                  <RiMessengerFill style={{ fill: '#262626' }} />
                ) : (
                  <RiMessengerLine />
                )}
              </Link>
              <NotificationButton />
              <div className=' nav__center--dropdown'>
                <button
                  className='is-flexed'
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <img
                    className={` nav__center--dropdown__image ${
                      showSettings && 'clicked'
                    }`}
                    src={userInfo.profileImage}
                    alt={userInfo.username}
                  />
                </button>
                {showSettings && (
                  <ul className=' nav__center--dropdown-content'>
                    <li>
                      <Link to={`/profile/${userInfo._id}`}>
                        <IoIosPerson /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to='/settings'>
                        <IoIosSettings /> Settings
                      </Link>
                    </li>
                    <li>
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
