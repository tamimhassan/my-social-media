import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Signout, isAuthenticated } from '../auth';
import defaultAvatar from '../images/defaultAvatar.png';
import webLogo from '../images/webLogo.png';

function Menu({ history }) {
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#1f6faf' };
    else return { color: '#ffffff' };
  };

  return (
    <div>
      <nav className='navbar navbar-expand-sm navbar-dark orange lighten-1'>
        <Link
          className='navbar-brand'
          to='/'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={webLogo}
            alt='webLogo'
            className='mr-1'
            style={{ height: 35 }}
          />
          Social Zone
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent-555'
          aria-controls='navbarSupportedContent-555'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent-555'
        >
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link' style={isActive(history, '/')}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/users'
                className='nav-link'
                style={isActive(history, '/users')}
              >
                Users
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/post/create'
                className='nav-link'
                style={isActive(history, '/post/create')}
              >
                Create Post
              </Link>
            </li>
            {!isAuthenticated() && (
              <>
                <li className='nav-item'>
                  <Link
                    to='/signin'
                    className='nav-link'
                    style={isActive(history, '/signin')}
                  >
                    Sign In
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/signup'
                    className='nav-link'
                    style={isActive(history, '/signup')}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
              <li className='nav-item'>
                <Link
                  to={`/admin`}
                  style={isActive(history, `/admin`)}
                  className='nav-link'
                >
                  Admin
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <>
                <li className='nav-item'>
                  <Link
                    to='/findpeople'
                    className='nav-link'
                    style={isActive(history, '/signup')}
                  >
                    Find People
                  </Link>
                </li>

                <li className='nav-item'>
                  <span
                    style={{ cursor: 'pointer' }}
                    className='nav-link'
                    onClick={() => Signout(() => history.push('/'))}
                  >
                    Sign Out
                  </span>
                </li>
                <li className='nav-item'>
                  <Link
                    to={`/user/${isAuthenticated().user._id}`}
                    className='nav-link p-0'
                    title='Profile'
                  >
                    <img
                      src={defaultAvatar}
                      className='rounded-circle z-depth-0'
                      alt='avatar'
                      height='35'
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Menu);
