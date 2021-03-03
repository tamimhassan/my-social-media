import React from 'react';
import { GoogleLogin } from 'react-google-login';

function SocialLogin() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className='container'>
      <GoogleLogin
        clientId='195512577268-r4s8jetp6ecut6auai1gcc3l9l9pvkfg.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
}

export default SocialLogin;
