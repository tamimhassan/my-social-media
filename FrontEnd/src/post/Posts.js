import React, { useEffect, useState } from 'react';
import { list } from './apiPost';
import { Link } from 'react-router-dom';
import defaultPostImage from '../images/man.jpg';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setpage] = useState(1);

  const loadMore = (number) => {
    setpage(page + number);
    loadPosts(page + number);
  };

  const loadLess = (number) => {
    setpage(page - number);
    loadPosts(page - number);
  };

  const loadPosts = (page) => {
    list(page).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  useEffect(() => {
    loadPosts(page);
  }, []);

  const renderPost = (posts) => {
    return (
      <div className='row'>
        {posts.map((post, index) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
          const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
          return (
            <div className='col-xl-4 col-md-6 col-sm-12 mb-4' key={index}>
              <div className='card testimonial-card'>
                <div className='card-body'>
                  <div
                    className='post__image'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                      alt={post.title}
                      onError={(i) => (i.target.src = `${defaultPostImage}`)}
                      className='img-thunbnail mb-3'
                      style={{ height: '200px', width: 'auto' }}
                    />
                  </div>
                  <h4 className='card-title'>{post.title}</h4>
                  <hr />
                  <p>{post.body.substring(0, 100)}</p>
                  <br />
                  <p className='font-italic mark'>
                    Posted by <Link to={`${posterId}`}>{posterName}</Link> on{' '}
                    {new Date(post.created).toDateString()}
                  </p>
                  <Link
                    to={`/post/${post._id}`}
                    className='btn sunny-morning-gradient'
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className='container'>
        <h2 className='mt-5 mb-5'>
          {!posts?.length ? 'No Post Here Go to Previous Page' : 'Recent Posts'}
        </h2>
        {posts ? renderPost(posts) : undefined}
      </div>
      {page > 1 ? (
        <button
          className='btn btn-raised btn-warning mr-5 mt-5 mb-5'
          onClick={() => loadLess(1)}
        >
          Previous ({page - 1})
        </button>
      ) : (
        ''
      )}

      {posts?.length ? (
        <button
          className='btn btn-raised btn-success mt-5 mb-5'
          onClick={() => loadMore(1)}
        >
          Next ({page + 1})
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default Posts;
