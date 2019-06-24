const bcrypt = require('bcryptjs')

const Users = require('../models/user-models.js')

module.exports = {
  validateUserId,
  validateUserChanges
};

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params

    Users.findUserById(id)
    .then(user => {
      if(user) {
        req.userId = user.id
        next()
      } else {
        res.status(400).json({ message: "Invalid user id" })
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error finding User"})
    })

};

function validateUserChanges(req, res, next) {
  const { username, fullname, email, userImgUrl, password } = req.body

    if(Object.keys(req.body).length) {
      if(username && fullname && email && userImgUrl && password) {

        Users.findByUserCreds({ username })
          .first()
          .then(user => {

            const hash = bcrypt.hashSync(password, 10);
            if (user && bcrypt.compareSync(password, user.password)) {
                req.changes = {
                  ...req.body,
                  password: hash
                }
                next()
            } else {
              req.changes = {
                ...req.body,
                password: hash
              }
              next()
            }

          })
          .catch(error => {
            res.status(500).json({message: "Error saving user password"});
          })
      } else {
        res.status(428).json({ message: "missing required field" })
      }
    } else {
      res.status(404).json({ message: "missing User information" })
    }

}
