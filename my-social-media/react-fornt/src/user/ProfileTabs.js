import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';

function ProfileTabs({ followers, following, posts }) {
  return (
    <div
      className='row mt-4 mb-5'
      style={{ marginLeft: '0', marginRight: '0', background: 'aliceblue' }}
    >
      <div className='col-md-4 mt-4'>
        <h3 className='text-primary'>followers</h3>
        <hr />
        {followers === undefined ? (
          <h1 className='lead'>Loading...</h1>
        ) : (
          followers.map((person, index) => (
            <div key={index}>
              <Link
                to={`/user/${person._id}`}
                style={{
                  display: 'flex',
                }}
              >
                <img
                  className='float-left mr-2'
                  style={{
                    height: '30px',
                    borderRadius: '50%',
                    width: '30px',
                  }}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                  alt={person.name}
                  onError={(i) => (i.target.src = `${defaultAvatar}`)}
                />
                <p className='lead'>{person.name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className='col-md-4 mt-4'>
        <h3 className='text-primary'>following</h3>
        <hr />
        {following === undefined ? (
          <h1>Loading...</h1>
        ) : (
          following.map((person, index) => (
            <div key={index}>
              <Link
                to={`/user/${person._id}`}
                style={{
                  display: 'flex',
                }}
              >
                <img
                  className='float-left mr-2'
                  style={{
                    height: '30px',
                    borderRadius: '50%',
                    width: '30px',
                  }}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                  alt={person.name}
                  onError={(i) => (i.target.src = `${defaultAvatar}`)}
                />
                <p className='lead'>{person.name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className='col-md-4 mt-4'>
        <h3 className='text-primary'>Posts</h3>
        <hr />
        {posts === undefined ? (
          <h1>Loading...</h1>
        ) : (
          posts.map((post, index) => (
            <div key={index}>
              <Link
                to={`/post/${post._id}`}
                style={{
                  display: 'flex',
                }}
              >
                <p className='lead'>{post.title}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileTabs;
