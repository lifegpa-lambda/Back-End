const express = require('express');

const bcrypt = require('bcryptjs')

const { authenticate } = require('./authenticate')
const { generateToken } = require('./token')
const Users = require('../models/user-models.js')


const router = express.Router();

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if(!user.userImgUrl) {
    user.userImgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }

  if(!user.username || !user.password || !user.fullname || !user.email) {
    return res.status(412).json({message: 'One or more inputs missing... username, password, fullname, email'})
  }

  Users.addUser(user)
    .then(user => {
      res.status(201).json({
        id: user.id,
        message: 'User registration Successful'
      });
    })
    .catch(error => {
      res.status(500).json({message: 'Error registering User.'});
    });
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findByUserCreds({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          user,
          token
        });
      } else {
        res.status(401).json({ message: 'User credentials invalid, please register...' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router
