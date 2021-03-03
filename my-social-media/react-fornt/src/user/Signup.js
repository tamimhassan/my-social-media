import React, { useState } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e, stateName) => {
    setError('');
    stateName(e.target.value);
  };

  // Submited SignIn from
  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    // bakend

    signup(user).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setName('');
        setPassword('');
        setEmail('');
        setOpen(true);
      }
    });
  };

  return (
    <div className='container'>
      <h2 className='mt-5 mb-5'>SignUp</h2>
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
      <div className='alert alert-info' style={{ display: open ? '' : 'none' }}>
        New account is successfully created. Please{' '}
        <Link to='/signin'>Sign In</Link>
      </div>
      <form action=''>
        <div className='md-form form-group mt-5'>
          <label className='text-muted'>Name</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>
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
        Already have an account?{' '}
        <Link to='/signin' style={{ color: '#007791', fontWeight: 'bold' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Signup;
