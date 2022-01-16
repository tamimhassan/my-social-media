import React, { useEffect, useState } from 'react';
import Posts from '../post/Posts';
import Users from '../user/Users';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

function Admin() {
  const [redirectToHome, setredirectToHome] = useState(false);

  useEffect(() => {
    if (isAuthenticated().user.role !== 'admin') {
      setredirectToHome(true);
    }
  }, []);

  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className='jumbotron'>
        <h2>Admin Dashboard</h2>
        <p className='lead'>Welcome to React Frontend</p>
      </div>
      <div className='container-fluid'>
        <h2 style={{ textAlign: 'center' }}>All users and posts</h2>
        <div className='row'>
          <div className='col-md-12'>
            <hr />
            <Users />
          </div>
          <div className='col-md-12'>
            <hr />
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
