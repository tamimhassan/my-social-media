import React, { useEffect, useState } from 'react';
import { findPeople, follow } from './apiUser';
import { Link } from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import { isAuthenticated } from '../auth';

function FindPeople() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [followMessage, setFollowMessage] = useState('');

  useEffect(() => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  const clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        setError({ error: data.error });
      } else {
        let toFollow = users;
        toFollow.splice(i, 1);
        setUsers(toFollow);
        setOpen(true);
        setFollowMessage(`Following ${user.name}`);
      }
    });
  };

  return (
    <div>
      <div className='container'>
        <h2 className='mt-5 mb-5'>Find People</h2>
        <div className=''>
          {open && (
            <div className='alert alert-success'>
              <p>{followMessage}</p>
            </div>
          )}
        </div>
        <div className='row'>
          {users.map((user, index) => (
            <div
              className='col-xl-3 col-md-4 col-sm-6 col-xs-12 mb-4'
              key={index}
            >
              <div className='card testimonial-card'>
                <div
                  className='card-up sunny-morning-gradient'
                  style={cardUpStyle}
                ></div>

                <div className='avatar mx-auto white' style={avatarStyle}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                    onError={(i) => (i.target.src = `${defaultAvatar}`)}
                    className='rounded-circle'
                    style={imgSyle}
                    alt='avatar'
                  />
                </div>

                <div className='card-body' style={cardBodyStyle}>
                  <h4 className='card-title'>{user.name}</h4>
                  <h6 className='font-weight-bold indigo-text py-2'>
                    {/* User Propation */}
                  </h6>
                  <hr />
                  <p>{user.email}</p>

                  <Link
                    to={`/user/${user._id}`}
                    className='btn sunny-morning-gradient'
                  >
                    View Profile
                  </Link>
                  <button
                    className='btn btn-yellow mt-3'
                    onClick={() => clickFollow(user, index)}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindPeople;

const cardUpStyle = {
  height: '120px',
  overflow: 'hidden',
  borderTopLeftRadius: '0.25rem',
  borderTopRightRadius: '0.25rem',
};

const avatarStyle = {
  width: '120px',
  marginTop: '-60px',
  overflow: 'hidden',
  border: '5px solid #fff',
  borderRadius: '50%',
};
const imgSyle = {
  width: '100%',
  height: '110px',
};
const cardBodyStyle = {
  textAlign: 'center',
};
