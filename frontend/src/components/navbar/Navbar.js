import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSettings, IoIosPerson } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';
import { SearchBar, NotificationButton } from '../../components';
import ChatButton from './ChatButton';
import ExploreButton from './ExploreButton';
import UploadButton from './UploadButton';
import logo from '../../assets/leet-logo.png';
import useComponentVisible from '../../hooks/useComponentVisible';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const {
    ref,
    isComponentVisible: showSettings,
    setIsComponentVisible: setShowSettings,
  } = useComponentVisible(false);

  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <nav className='nav'>
      <div className='nav__center'>
        <div className='is-flexed'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo' />
          </Link>
          {userInfo && <SearchBar />}
        </div>
        <div>
          {userInfo ? (
            <div className='is-flexed'>
              <UploadButton />
              <ChatButton />
              <ExploreButton />
              <NotificationButton />
              <div className='nav__center--dropdown'>
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
                  <ul className='nav__center--dropdown-content' ref={ref}>
                    <li>
                      <Link to={`/profile/${userInfo.username}`}>
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
