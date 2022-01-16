import React, { useState } from 'react';
import { forgotPassword } from '../auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const forgotPasswordHandle = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    forgotPassword(email).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data.message);
        setMessage(data.message);
      }
    });
  };

  return (
    <div className='container'>
      <h2 className='mt-5 mb-5'>Ask for Password Reset</h2>
      {message && <h4 className='bg-success'>{message}</h4>}
      {error && <h4 className='bg-warning'>{error}</h4>}
      <form action=''>
        <div className='form-group mt-5'>
          <input
            type='email'
            className='form-control'
            placeholder='Your email address'
            value={email}
            name='email'
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
              setError('');
            }}
            autoFocus
          />
          <button
            className='btn btn-primary mt-4'
            onClick={forgotPasswordHandle}
          >
            Send Password Reset Link
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
