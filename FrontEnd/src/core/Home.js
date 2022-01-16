import React from 'react';
import Posts from '../post/Posts';

function Home() {
  return (
    <div className='home__page'>
      <div className='jumbotron'>
        <h2>Home</h2>
        <p className='lead'>Welcome to React Frontend</p>
      </div>
      <div className='container'>
        <Posts />
      </div>
    </div>
  );
}

export default Home;
