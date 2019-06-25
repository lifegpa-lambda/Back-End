module.exports = {
  validateUserInputs
}

function validateUserInputs(req, res, next) {
  let { username, password, fullname, email, userImgUrl } = req.body;

  if(!username || !password || !fullname || !email) {
    return res.status(412).json({message: 'One or more inputs missing... username, password, fullname, email'})
  }

  if(!userImgUrl) {
    userImgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    req.user = {
      ...req.body,
      userImgUrl: userImgUrl
    }
  }

  if(username && password && fullname && email && userImgUrl) {
    req.user = {
      ...req.body,
      userImgUrl: userImgUrl
    }
    next()
  }
}
