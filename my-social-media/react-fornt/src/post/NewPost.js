import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { create } from './apiPost';
import defaultAvatar from '../images/defaultAvatar.png';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      photo: '',
      error: '',
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({
        error: 'File size should be less than 100kb',
        loading: false,
      });
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      this.setState({ error: 'All fields are required', loading: false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (e) => {
    this.setState({ error: '' });
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    const fileSize = name === 'photo' ? e.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then((data) => {
        if (data && data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            loading: false,
            title: '',
            body: '',
            photo: '',
            redirectToProfile: true,
          });
        }
      });
    }
  };

  newPostForm = (title, body) => (
    <form>
      <div className='custom-file'>
        <input
          type='file'
          accept='image/*'
          className='custom-file-input'
          onChange={this.handleChange('photo')}
        />
        <label className='custom-file-label'>Choose Post Photo</label>
      </div>
      <div className='md-form form-group mt-5'>
        <label>Title</label>
        <input
          type='text'
          className='form-control'
          onChange={this.handleChange('title')}
          value={title}
        />
      </div>

      <div className='md-form form-group mt-5'>
        <label style={{ transform: 'translateY(-28px) scale(0.8)' }}>
          Body
        </label>
        <textarea
          type='text'
          className='form-control'
          onChange={this.handleChange('body')}
          value={body}
        />
      </div>
      <button
        type='submit'
        className='btn sunny-morning-gradient'
        onClick={this.submitHandler}
      >
        Create Post
      </button>
    </form>
  );

  render() {
    const {
      title,
      body,
      photo,
      error,
      user,
      loading,
      redirectToProfile,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div>
        <div className='container'>
          <h2 className='mt-5 mb-5'>Create a new post</h2>
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

          {this.newPostForm(title, body)}
        </div>
      </div>
    );
  }
}
