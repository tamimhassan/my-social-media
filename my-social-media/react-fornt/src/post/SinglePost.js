import React, { useEffect, useState } from 'react';
import { remove, singlePost, like, unlike } from './apiPost';
import { Link, Redirect } from 'react-router-dom';
import defaultPostImage from '../images/man.jpg';
import { isAuthenticated } from '../auth';
import { ThumbUp } from '@material-ui/icons';
import Comment from './Comment';

function SinglePost(props) {
  const [post, setpost] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const postId = props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setpost(data);
        setLikes(data.likes.length);
        setLikeState(checkLike(data.likes));
        setComments(data.comments);
      }
    });
  }, [props.match.params.postId]);

  const deletePost = () => {
    const postId = props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRedirectToHome(true);
      }
    });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm('Are you sure you want to delete your post?');
    if (answer) {
      deletePost();
    }
  };

  const checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;

    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  const updateComments = (comments) => {
    setComments(comments);
  };

  const likeToggle = () => {
    if (!isAuthenticated()) {
      setRedirectToSignIn(true);
      return false;
    }
    let callApi = likeState ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setLikeState(!likeState);
        setLikes(data.likes.length);
      }
    });
  };

  const renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
    const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

    return (
      <div>
        <div className=''>
          <div
            className='post__image mb-3'
            style={{
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'aliceblue',
            }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
              alt={post.title}
              onError={(i) => (i.target.src = `${defaultPostImage}`)}
              className='img-thunbnail mb-3'
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </div>

          {likeState ? (
            <span
              onClick={likeToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              <ThumbUp color='primary' /> {likes}Like
            </span>
          ) : (
            <span
              onClick={likeToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              <ThumbUp color='action' /> {likes}Like
            </span>
          )}

          <p className='mt-3'>{post.body}</p>
          <hr />
          <p className='font-italic mark'>
            Posted by <Link to={`${posterId}`}>{posterName}</Link> on{' '}
            {new Date(post.created).toDateString()}
          </p>
          <div className='d-inline-block'>
            <Link to='/' className='btn sunny-morning-gradient'>
              Back to posts
            </Link>

            {isAuthenticated().user &&
              isAuthenticated().user._id === post.postedBy._id && (
                <>
                  <Link to={`/post/edit/${post._id}`} className='btn btn-info'>
                    Update Post
                  </Link>
                  <button onClick={deleteConfirmed} className='btn btn-danger'>
                    Delete Post
                  </button>
                </>
              )}
            {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
              <div className='card mt-5'>
                <div className='card-body'>
                  <h5 className='card-title'>Admin</h5>
                  <p className='mb-2 text-danger'>Edit/Delete as an Admin</p>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className='btn btn-raised btn-warning btn-sm mr-5'
                  >
                    Update Post
                  </Link>
                  <button
                    onClick={deleteConfirmed}
                    className='btn btn-raised btn-danger'
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  if (redirectToHome) {
    return <Redirect to='/' />;
  }

  if (redirectToSignIn) {
    return <Redirect to='/signin' />;
  }
  // console.log(post.postedBy._id);

  return (
    <div className='container'>
      <h2 className='mt-5 mb-4'>{post.title}</h2>
      {!post ? (
        <div className='jumbotron text-center'>
          <h2>Loading...</h2>
        </div>
      ) : (
        renderPost(post)
      )}

      <Comment
        // posterId={post.postedBy._id}
        postId={post._id}
        comments={comments.reverse()}
        updateComments={updateComments}
      />
    </div>
  );
}

export default SinglePost;
