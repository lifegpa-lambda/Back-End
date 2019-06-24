const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      return knex('users').insert([
        {
          username: 'zach',
          password: bcrypt.hashSync('1234', 10),
          fullName: 'Zach Christy',
          email: 'zchristy44@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        {
          username: 'bean',
          password:
          bcrypt.hashSync('1234', 10),
          fullName: 'Rowan Atkinson',
          email: 'mrbean@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        {
          username: 'inspector',
          password:
          bcrypt.hashSync('1234', 10),
          fullName: 'Jacques Clouseau',
          email: 'inspector@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
      ]);
    });
};
