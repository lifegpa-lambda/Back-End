const express = require('express');

const bcrypt = require('bcryptjs')

const { authenticate } = require('./authenticate')
const { generateToken } = require('./token')
const { validateUserInputs } = require('../middleware/register-middleware.js')
const { validateLoginCreds } = require('../middleware/login-middleware.js')
const Users = require('../models/user-models.js')


const router = express.Router();

router.post('/register', validateUserInputs, (req, res) => {
  let user = req.user;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.addUser(user)
    .then(user => {
      res.status(201).json({
        id: user.id,
        message: `${user.username}'s registration Successful`
      });
    })
    .catch(error => {
      res.status(500).json({message: 'Error registering User.'});
    });
})

router.post('/login', validateLoginCreds, (req, res) => {
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
      res.status(500).json({message: "Error Loging in User"});
    });
})

module.exports = router
