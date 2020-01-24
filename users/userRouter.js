const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'Error in adding User'
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(post => {
      res.staus(201).json(post);
    })
    .catch(error => {
      res.staus(500).json({
        errorMessage: 'Post could not be added'
      });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.staus(500).json({
        errorMessage: 'User info could not be retrieved'
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.staus(200).json(res.user);
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'cannot retrieve user posts'
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id).then(user => {
    res
      .status(200)
      .json({
        message: 'The user is no more'
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'error in deleting user'
        });
      });
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(hub);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: ' error updatding user'
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  user.getById(id).then(user => {
    if (user) {
      console.log(user);
      req.user = user;
      next();
    } else {
      res.staus(400).json({ message: 'invalid user id' });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: 'missing required user data'
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: 'missing required name field'
    });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: 'missing post data'
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: 'missing requred text field'
    });
  }
}

module.exports = router;
