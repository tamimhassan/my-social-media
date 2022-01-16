import React, { useEffect, useState } from 'react';
import { list } from './apiUser';
import { Link } from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import Posts from '../post/Posts';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);
  const allUsers = (users) => {
    return (
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
                  className='rounded-circle'
                  style={imgSyle}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  onError={(i) => (i.target.src = `${defaultAvatar}`)}
                  alt={user.name}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className='container'>
        <h2 className='mt-5 mb-5'>Users</h2>
        {allUsers(users)}
      </div>
    </div>
  );
}

export default Users;

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
