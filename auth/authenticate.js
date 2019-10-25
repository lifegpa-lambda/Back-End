const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'secret';

module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  // console.log(jwt.verify(token, jwtKey))
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if(err) {
        return res.status(401).json(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'No token provided, must be set on the Authorization Header',
    });
  }
}
