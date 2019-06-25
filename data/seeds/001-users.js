const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return knex('users').insert([
        {
          username: 'zach',
          password: bcrypt.hashSync('1234', 10),
          fullname: 'Zach Christy',
          email: 'zchristy44@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        {
          username: 'bean',
          password:
          bcrypt.hashSync('1234', 10),
          fullname: 'Rowan Atkinson',
          email: 'mrbean@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        {
          username: 'inspector',
          password:
          bcrypt.hashSync('1234', 10),
          fullname: 'Jacques Clouseau',
          email: 'inspector@gmail.com',
          userImgUrl:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
      ]).returning('*')
    });
};
