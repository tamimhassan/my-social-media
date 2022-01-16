import React, { useState } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';

function Comment({ postId, comments, updateComments }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setError('');
    setText(e.target.value);
  };

  const isValid = () => {
    if (text.length <= 0 || text.length > 150) {
      setError(
        'Comment should not be empty and not longer than 150 characters',
      );
      return false;
    }
    return true;
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      setError('Please signin to leave a comment');
      return false;
    }
    if (isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      comment(userId, token, postId, { text: text }).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setText('');
          console.log(data.comments);
          updateComments(data.comments);
        }
      });
    }
  };

  const deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        updateComments(data.comments);
      }
    });
  };

  const deleteConfirmed = (comment) => {
    let answer = window.confirm(
      'Are you sure you want to delete your comment?',
    );
    if (answer) {
      deleteComment(comment);
    }
  };

  return (
    <div>
      <h2 className='mt-5 mb-5'>Leave a comment</h2>
      <form onSubmit={addComment}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Leave a comment...'
            value={text}
            onChange={(e) => handleChange(e)}
          />
          <button type='submit' className='btn btn-success'>
            Post Comment
          </button>
        </div>
      </form>
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
      <div className='col-md-12 mt-4'>
        <h3 className='text-primary'>{comments.length} Comments</h3>
        <hr />
        {comments === undefined ? (
          <h1>Loading...</h1>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className='mb-5'>
              <Link to={`/user/${comment.postedBy._id}`}>
                <img
                  className='float-left mr-2'
                  style={{
                    height: '30px',
                    borderRadius: '50%',
                    width: '30px',
                  }}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                  alt={comment.postedBy.name}
                  onError={(i) => (i.target.src = `${defaultAvatar}`)}
                />
              </Link>
              <p className='lead mb-0'>{comment.text}</p>
              <br />
              <p className='font-italic mark'>
                Posted by{' '}
                <Link to={`/user/${comment.postedBy._id}`}>
                  {comment.postedBy.name}
                </Link>{' '}
                on {new Date(comment.created).toDateString()}
                <span>
                  {isAuthenticated().user &&
                    isAuthenticated().user._id === comment.postedBy._id && (
                      <>
                        <span
                          onClick={() => deleteConfirmed(comment)}
                          className='text-danger float-right mr-1'
                          style={{ cursor: 'pointer' }}
                        >
                          Remove
                        </span>
                      </>
                    )}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comment;
