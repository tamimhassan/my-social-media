const express = require('express');
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment,
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator/index');
const { userById } = require('../controllers/user');

const router = express.Router();

// like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// comment
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

router.get('/posts', getPosts);
router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  createPostValidator,
);

router.get('/post/:postId', singlePost);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
// Photo
router.get('/post/photo/:postId', photo);

// any route containing :user id our app will first execute userById()
router.param('userId', userById);
// any route containing :user id our app will first execute userById()
router.param('postId', postById);

module.exports = router;
