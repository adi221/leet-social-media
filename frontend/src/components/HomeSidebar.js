import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components';
import { getUserSuggestions } from '../actions/userActions';

const HomeSidebar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, error, suggestions } = useSelector(
    state => state.userSuggestions
  );

  useEffect(() => {
    if (window.matchMedia('(min-width:1064px)').matches) {
      dispatch(getUserSuggestions(userInfo._id));
    }
  }, [dispatch, userInfo]);

  if (loading)
    return (
      <aside className='home-sidebar'>
        <Loader />
      </aside>
    );

  const { username, profileImage, _id, name } = userInfo;
  return (
    <aside className='home-sidebar'>
      <header className='home-sidebar-header is-flexed'>
        <img className='margin-right16' src={profileImage} alt={username} />
        <div>
          <Link to={`/profile/${_id}`} className='bold '>
            {username}
          </Link>
          <p>{name}</p>
        </div>
      </header>
      {suggestions.length > 0 && (
        <article className='home-sidebar-suggestions'>
          <h4>Suggestions for you</h4>
          <div className='home-sidbar-suggestions-container'>
            {suggestions.map(s => {
              return (
                <div key={s._id} className='suggestion'>
                  <img
                    src={s.profileImage}
                    alt={s.username}
                    className='margin-right16'
                  />
                  <div>
                    <Link to={`/profile/${s._id}`} className='bold underline'>
                      {s.username}
                    </Link>
                    <p>{s.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      )}
      <footer className='home-sidebar-footer'>
        @{new Date().getFullYear()} Leet social media <br /> By{' '}
        <a
          href='https://github.com/adi221'
          target='_blank'
          rel='noopener noreferrer'
        >
          Adi Mizrahi
        </a>
      </footer>
    </aside>
  );
};

export default HomeSidebar;
