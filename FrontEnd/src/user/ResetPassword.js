import React, { useState } from 'react';
import { resetPassword } from '../auth';

function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const resetPasswordHandle = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    resetPassword({
      newPassword: newPassword,
      resetPasswordLink: props.match.params.resetPasswordToken,
    }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data.message);
        setMessage(data.message);
        setNewPassword('');
      }
    });
  };

  return (
    <div className='container'>
      <h2 className='mt-5 mb-5'>Reset your Password</h2>
      {message && <h4 className='bg-success'>{message}</h4>}
      {error && <h4 className='bg-warning'>{error}</h4>}
      <form action=''>
        <input
          type='password'
          className='form-control'
          placeholder='Your new password'
          value={newPassword}
          name='newPassword'
          onChange={(e) => {
            setNewPassword(e.target.value);
            setMessage('');
            setError('');
          }}
          autoFocus
        />
        <button className='btn btn-primary' onClick={resetPasswordHandle}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
