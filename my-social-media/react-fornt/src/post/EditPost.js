import React, { Component } from 'react';
import { update, singlePost } from './apiPost';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import defaultPostImage from '../images/man.jpg';

export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      body: '',
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      loading: false,
    };
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
      const postId = this.state.id;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then((data) => {
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

  init = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: '',
        });
      }
    });
  };

  // init = (postId) => {
  //   singlePost(postId).then((data) => {
  //     if (data.error) {
  //       this.setState({ redirectToProfile: true });
  //     } else {
  //       this.setState({
  //         // id is not post.postedBy._id
  //         id: data.postedBy._id,
  //         title: data.title,
  //         body: data.body,
  //         error: '',
  //       });
  //     }
  //   });
  // };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  editPostForm = (title, body) => (
    <form>
      <div className='custom-file'>
        <input
          type='file'
          accept='image/*'
          className='custom-file-input'
          onChange={this.handleChange('photo')}
        />
        <label className='custom-file-label'>Post Photo</label>
      </div>
      <div className='md-form form-group mt-5'>
        <label style={{ transform: 'translateY(-14px) scale(0.8)' }}>
          Title
        </label>
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
        Update Post
      </button>
    </form>
  );

  render() {
    const { title, body, redirectToProfile, id, error, loading } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/post/${id}`} />;
    }

    return (
      <div className='container mb-4'>
        <h2 className='mt-5 mb-5'>{title}</h2>

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
          src={`${
            process.env.REACT_APP_API_URL
          }/post/photo/${id}?${new Date().getTime()}`}
          onError={(i) => (i.target.src = `${defaultPostImage}`)}
          alt={title}
          className='img-thumbnail mb-3'
          style={{ height: '250px', width: 'auto' }}
        />

        {this.editPostForm(title, body)}

        {/* {isAuthenticated().user.role === 'admin' ||
          (isAuthenticated().user._id === id && this.editPostForm(title, body))} */}
      </div>
    );
  }
}
