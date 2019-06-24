const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUserById,
  findByUserCreds,
  removeUser,
  updateUser
};

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findByUserCreds(filter) {
  return db('users').where(filter);
}

async function addUser(user) {
  const [id] = await db('users').insert(user);

  return findUserById(id);
}

function updateUser(id, changes) {
  return db('users')
  .where({ id })
  .update(changes, '*');
}

function removeUser(id) {
  return db('users')
  .where({ id })
  .del();
}
