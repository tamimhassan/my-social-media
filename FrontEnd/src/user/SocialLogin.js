import React from 'react';
import { GoogleLogin } from 'react-google-login';

function SocialLogin() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className='container'>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
}

export default SocialLogin;
