import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read } from './apiUser';
import defaultAvatar from '../images/defaultAvatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { listByUser } from '../post/apiPost';

function Profile(props) {
  const [user, setUser] = useState('');
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [following, setFollowing] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  const checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, user._id).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setUser(data);
        setFollowing(!following);
      }
    });
  };

  const loadPost = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        let following = checkFollow(data);
        setUser(data);
        setFollowing(following);
        loadPost(data._id);
      }
    });
  }, [props]);

  if (redirectToSignin) {
    return <Redirect to='/signin' />;
  }

  const photoUrl = user._id
    ? `${process.env.REACT_APP_API_URL}/user/photo/${
        user._id
      }?${new Date().getTime()}`
    : defaultAvatar;

  return (
    <div className='container'>
      <h2 className='mt-5 mb-5'>Profile</h2>
      <div className='row'>
        <div className='col-sm-4'>
          <img
            src={photoUrl}
            onError={(i) => (i.target.src = `${defaultAvatar}`)}
            className='img-thumbnail'
            alt='avatar'
            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
          />
        </div>
        <div className='col-sm-8'>
          <div className='lead mt-2'>
            <p>Hello {user.name}</p>
            <p>Email: {user.email}</p>
            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
          </div>
          {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
            <div className='d-flex-root mt-2'>
              <Link
                to={`/post/create`}
                className='btn sunny-morning-gradient mr-4'
                style={{ float: 'left' }}
              >
                Create Post
              </Link>
              <Link
                to={`/user/edit/${user._id}`}
                className='btn btn-success mr-4'
                style={{ float: 'left' }}
              >
                Edit Profile
              </Link>
              <DeleteUser userId={user._id} />
            </div>
          ) : (
            <FollowProfileButton
              following={following}
              onButtonClick={clickFollowButton}
            />
          )}
        </div>
      </div>
      <div>
        {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
          <div className='card mt-5'>
            <div className='card-body'>
              <h5 className='card-title'>Admin</h5>
              <p className='mb-2 text-danger'>Edit/Delete as an Admin</p>
              <Link
                className='btn btn-raised btn-success mr-5'
                to={`/user/edit/${user._id}`}
              >
                Edit Profile
              </Link>
              <DeleteUser userId={user._id} />
            </div>
          </div>
        )}
      </div>
      <div
        className='row mt-5'
        style={{ marginLeft: '0', marginRight: '0', background: 'aliceblue' }}
      >
        <div className='col-md-12'>
          <h4 className='mt-3'>About : -</h4>
          <hr />
          <p className='lead'>{user.about}</p>
        </div>
      </div>

      <ProfileTabs
        followers={user.followers}
        following={user.following}
        posts={posts}
      />
    </div>
  );
}

export default Profile;
