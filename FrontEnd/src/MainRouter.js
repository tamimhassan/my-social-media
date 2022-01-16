import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './admin/Admin';
import PrivateRouter from './auth/PrivateRouter';
import Home from './core/Home';
import Menu from './core/Menu';
import EditPost from './post/EditPost';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import ForgotPassword from './user/ForgotPassword';
import Profile from './user/Profile';
import ResetPassword from './user/ResetPassword';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Users from './user/Users';

function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route
          exact
          path='/reset-password/:resetPasswordToken'
          component={ResetPassword}
        />
        <PrivateRouter exact path='/post/create' component={NewPost} />
        <Route exact path='/users' component={Users} />
        <PrivateRouter exact path='/post/edit/:postId' component={EditPost} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/post/:postId' component={SinglePost} />
        <PrivateRouter
          exact
          path='/user/edit/:userId'
          component={EditProfile}
        />
        <PrivateRouter exact path='/findpeople' component={FindPeople} />
        <PrivateRouter exact path='/user/:userId' component={Profile} />
        <PrivateRouter exact path='/admin' component={Admin} />
      </Switch>
    </div>
  );
}

export default MainRouter;
