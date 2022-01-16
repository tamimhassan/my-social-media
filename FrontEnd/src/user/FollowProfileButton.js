import React from 'react';
import { follow, unfollow } from './apiUser';

function FollowProfileButton({ following, onButtonClick }) {
  const followClick = () => {
    onButtonClick(follow);
  };
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };
  return (
    <div>
      <div className='d-inline-block'>
        {!following ? (
          <button className='btn btn-yellow mt-3' onClick={followClick}>
            Follow
          </button>
        ) : (
          <button className='btn btn-deep-orange mt-3' onClick={unfollowClick}>
            UnFollow
          </button>
        )}
      </div>
    </div>
  );
}

export default FollowProfileButton;
