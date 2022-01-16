import React, { useState } from 'react';
// import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, stateName) => {
    setError('');
    stateName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email,
      password,
    };
    // console.log(user);
    // bakend

    signin(user).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        // authenticate
        authenticate(data, () => {
          setRedirectToReferer(true);
        });
      }
    });
  };

  // redirect
  if (redirectToReferer) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <h2 className='mt-5 mb-5'>SignIn</h2>
      {/* <GoogleLogin /> */}
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
      {loading ? (
        <div className='jumbotron text-center'>
          <h2>Loading...</h2>
        </div>
      ) : (
        ''
      )}
      <form action=''>
        <div className='md-form form-group mt-5'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            onChange={(e) => handleChange(e, setEmail)}
            value={email}
          />
        </div>
        <div className='md-form form-group mt-5'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            onChange={(e) => handleChange(e, setPassword)}
            value={password}
          />
        </div>
        <button
          type='submit'
          className='btn btn-success'
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
      <p className='mt-4' style={{ color: '#29303b', fontWeight: '400' }}>
        or{' '}
        <Link to='/forgot-password' style={{ color: '#007791' }}>
          Forgot Password
        </Link>
      </p>
      <p className='mt-5' style={{ color: '#29303b', fontWeight: '400' }}>
        Don't have an account?{' '}
        <Link to='/signup' style={{ color: '#007791', fontWeight: 'bold' }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Signin;
