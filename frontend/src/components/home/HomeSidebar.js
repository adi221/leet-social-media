import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '..';
import { getUserSuggestions } from '../../actions/userActions';

const HomeSidebar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, error, suggestions } = useSelector(
    state => state.userSuggestions
  );

  useEffect(() => {
    dispatch(getUserSuggestions(userInfo._id));
  }, [dispatch, userInfo]);

  if (loading)
    return (
      <aside className='home-sidebar'>
        <Loader />
      </aside>
    );

  const { username, profileImage, _id, name } = userInfo;
  return (
    <article className='home-sidebar'>
      <header>
        <img className='mr-sm' src={profileImage} alt={username} />
        <div>
          <Link to={`/profile/${_id}`} className='bold '>
            {username}
          </Link>
          <p>{name}</p>
        </div>
      </header>
      {suggestions.length > 0 && (
        <div className='home-sidebar__suggestions'>
          <h4>Suggestions for you</h4>
          <div className='home-sidebar__suggestions-container'>
            {suggestions.map(s => {
              return (
                <div
                  key={s._id}
                  className='home-sidebar__suggestions-suggestion'
                >
                  <img
                    src={s.profileImage}
                    alt={s.username}
                    className='mr-sm'
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
        </div>
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
    </article>
  );
};

export default HomeSidebar;
