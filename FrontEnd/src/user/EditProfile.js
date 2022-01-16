import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import defaultAvatar from '../images/defaultAvatar.png';

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      about: '',
      loading: false,
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: '',
          about: data.about,
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;

    if (fileSize > 2000000) {
      this.setState({
        error: 'File size should be less than 2000kb',
        loading: false,
      });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: 'Name is required', loading: false });
      return false;
    }
    if (!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email)) {
      this.setState({ error: 'A valid Email is required', loading: false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: 'Password must be at least 6 characters long',
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (e) => {
    this.setState({ error: '' });
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    const fileSize = name === 'photo' ? e.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  updateHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          updateUser(data, () => {
            this.setState({ redirectToProfile: true });
          });
        }
      });
    }
  };

  form = (name, email, password, about) => (
    <form>
      <div className='custom-file'>
        <input
          type='file'
          accept='image/*'
          className='custom-file-input'
          onChange={this.handleChange('photo')}
        />
        <label className='custom-file-label'>Choose you Profile Photo</label>
      </div>
      <div className='md-form form-group mt-5'>
        <label style={{ transform: 'translateY(-14px) scale(0.8)' }}>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          onChange={this.handleChange('name')}
          value={name}
        />
      </div>
      <div className='md-form form-group mt-5'>
        <label style={{ transform: 'translateY(-14px) scale(0.8)' }}>
          Email
        </label>
        <input
          type='email'
          className='form-control'
          onChange={this.handleChange('email')}
          value={email}
        />
      </div>
      <div className='md-form form-group mt-5'>
        <label style={{ transform: 'translateY(-28px) scale(0.8)' }}>
          About
        </label>
        <textarea
          type='text'
          className='form-control'
          onChange={this.handleChange('about')}
          value={about}
        />
      </div>
      <div className='md-form form-group mt-5'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={this.handleChange('password')}
          value={password}
        />
      </div>
      <button
        type='submit'
        className='btn btn-success'
        onClick={this.updateHandler}
      >
        Update
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : defaultAvatar;

    return (
      <div>
        <div className='container'>
          <h2 className='mt-5 mb-5'>Edit Profile</h2>
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
          <img
            src={photoUrl}
            onError={(i) => (i.target.src = `${defaultAvatar}`)}
            alt={name}
            className='img-thumbnail mb-3'
            style={{ height: '250px', width: 'auto' }}
          />

          {this.form(name, email, password, about)}
        </div>
        {/* {isAuthenticated().user.role === 'admin' ||
          (isAuthenticated().user._id === id &&
            this.signupForm(name, email, password, about))} */}
      </div>
    );
  }
}
