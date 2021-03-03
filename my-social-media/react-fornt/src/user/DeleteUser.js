import React, { useState } from 'react';
import { isAuthenticated } from '../auth';
import { remove } from './apiUser';
import { Signout } from '../auth';
import { Redirect } from 'react-router-dom';

function DeleteUser({ userId }) {
  const [redirect, setRedirect] = useState(false);

  const deleteAccount = () => {
    const token = isAuthenticated().token;
    remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // signout user
        Signout(() => console.log('User is deleted'));
        // redirect
        setRedirect(true);
      }
    });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm(
      'Are you sure you want to delete your account?',
    );
    if (answer) {
      deleteAccount();
    }
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <button className='btn btn-danger' onClick={deleteConfirmed}>
        Delete Profile
      </button>
    </>
  );
}

export default DeleteUser;
