const bcrypt = require('bcryptjs')

module.exports = {
  validateLoginCreds
}

function validateLoginCreds(req, res, next) {
  const { username, password } = req.body
    if (!username || !password) {
        res.status(405).json({message: "Missing field content, please try again"})
    } else {
      next()
    }
}
